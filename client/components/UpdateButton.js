import React, { Component } from "react";
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
  const canUpdate = () => {
    const {
      selectedReservationData: {
        id,
        name,
        hotelName,
        arrivalDate,
        departureDate
      }
    } = props;

    return (
      id &&
      name != null &&
      name.trim().length > 0 &&
      hotelName != null &&
      hotelName.trim().length > 0 &&
      arrivalDate != null &&
      departureDate != null
    );
  };

  const handleUpdate = () => {
    const {
      selectedReservationData: {
        id,
        name,
        hotelName,
        arrivalDate,
        departureDate
      }
    } = props;

    props.updateReservation(
      id,
      name.trim(),
      hotelName.trim(),
      arrivalDate,
      departureDate
    );
  };

  if (!canUpdate()) {
    return null;
  }
  return <button onClick={handleUpdate}>Update Reservation</button>;
};

const mapStateToProps = ({ selectedReservationData }) => ({
  selectedReservationData
});

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
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
