import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setID } from "../lib/store";

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

class UpdateButton extends Component {
  canUpdate = () => {
    const { id, name, hotelName, arrivalDate, departureDate } = this.props;

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

  handleUpdate = () => {
    const { id, name, hotelName, arrivalDate, departureDate } = this.props;
    this.props.updateReservation(
      id,
      name.trim(),
      hotelName.trim(),
      arrivalDate,
      departureDate
    );
    this.props.setID("");
  };

  render() {
    if (!this.canUpdate()) {
      return null;
    }
    return <button onClick={this.handleUpdate}>Update Reservation</button>;
  }
}

const mapStateToProps = ({
  id,
  name,
  hotelName,
  arrivalDate,
  departureDate
}) => ({
  id,
  name,
  hotelName,
  arrivalDate,
  departureDate
});

const mapDispatchToProps = dispatch => {
  return {
    setID: bindActionCreators(setID, dispatch)
  };
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
