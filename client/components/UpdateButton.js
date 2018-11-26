import React from "react";
import { connect } from "react-redux";

import { graphql } from "react-apollo";
import gql from "graphql-tag";

const updateReservation = gql`
  mutation updateReservation(
    $id: ID!
    $name: String!
    $hotelName: String!
    $arrivalDate: String!
    $departureDate: String!
  ) {
    updateReservation(
      id: $id
      name: $name
      hotelName: $hotelName
      arrivalDate: $arrivalDate
      departureDate: $departureDate
    ) {
      __typename
      id
      name
      hotelName
      arrivalDate
      departureDate
    }
  }
`;

const UpdateButton = props => {
  const {
    selectedReservationData: { id, name, hotelName, arrivalDate, departureDate }
  } = props;

  if (!id) {
    return null;
  }

  const canUpdate = () => {
    return (
      id &&
      name.trim().length > 0 &&
      hotelName.trim().length > 0 &&
      arrivalDate &&
      departureDate
    );
  };

  const handleUpdate = () => {
    props.updateReservation(
      id,
      name.trim(),
      hotelName.trim(),
      arrivalDate,
      departureDate
    );
  };

  const disabled = !canUpdate();
  return (
    <button disabled={disabled} onClick={handleUpdate}>
      Update Reservation
    </button>
  );
};

const mapStateToProps = ({ selectedReservationData }) => ({
  selectedReservationData
});

export default connect(
  mapStateToProps,
  null
)(
  graphql(updateReservation, {
    props: ({ mutate }) => ({
      updateReservation: (id, name, hotelName, arrivalDate, departureDate) =>
        mutate({
          variables: { id, name, hotelName, arrivalDate, departureDate },
          optimisticResponse: {
            updateReservation: {
              __typename: "Reservation",
              id: id,
              name: name,
              hotelName: hotelName,
              arrivalDate: arrivalDate,
              departureDate: departureDate
            }
          }
        })
    })
  })(UpdateButton)
);
