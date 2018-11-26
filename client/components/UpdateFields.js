import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setNameAndHotelName } from "../lib/store";

import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";

export const getReservation = gql`
  query getReservation($id: ID!) {
    getReservation(id: $id) {
      __typename
      id
      name
      hotelName
      arrivalDate
      departureDate
    }
  }
`;

class UpdateFields extends Component {
  render() {
    const {
      id,
      name,
      hotelName,
      arrivalDate,
      departureDate,
      reservation: { getReservation }
    } = this.props;

    if (!getReservation || !id) {
      return null;
    }

    const nameValue = name === null ? getReservation.name : name;
    const hotelNameValue =
      hotelName === null ? getReservation.hotelName : hotelName;
    const arrivalDateValue =
      arrivalDate === null ? getReservation.arrivalDate : arrivalDate;
    const departureDateValue =
      departureDate === null ? getReservation.departureDate : departureDate;

    return (
      <form>
        <h1>Update Reservation</h1>
        <div>
          <label htmlFor="id">ID</label>
          <input
            style={{ border: "none" }}
            placeholder="ID"
            name="id"
            type="text"
            readOnly
            value={getReservation.id}
          />
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input
            autoComplete="off"
            placeholder="Name"
            name="name"
            type="text"
            required
            value={nameValue}
            onChange={e =>
              this.props.setNameAndHotelName({
                name: e.target.value,
                hotelName: hotelNameValue,
                arrivalDate: arrivalDateValue,
                departureDate: departureDateValue
              })
            }
          />
        </div>
        <div>
          <label htmlFor="hotelName">Hotel</label>
          <input
            autoComplete="off"
            placeholder="Hotel"
            name="hotelName"
            type="text"
            required
            value={hotelNameValue}
            onChange={e =>
              this.props.setNameAndHotelName({
                name: nameValue,
                hotelName: e.target.value,
                arrivalDate: arrivalDateValue,
                departureDate: departureDateValue
              })
            }
          />
        </div>
        <div>
          <label htmlFor="arrivalDate">Arrival Date</label>
          <input
            type="date"
            name="arrivalDate"
            min="2018-01-01"
            max="2020-12-31"
            required
            value={arrivalDateValue}
            pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
            onChange={e =>
              this.props.setNameAndHotelName({
                name: nameValue,
                hotelName: hotelNameValue,
                arrivalDate: e.target.value,
                departureDate: departureDateValue
              })
            }
          />
        </div>
        <div>
          <label htmlFor="departureDate">Departure Date</label>
          <input
            type="date"
            name="departureDate"
            min="2018-01-01"
            max="2020-12-31"
            required
            value={departureDateValue}
            pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
            onChange={e =>
              this.props.setNameAndHotelName({
                name: nameValue,
                hotelName: hotelNameValue,
                arrivalDate: arrivalDateValue,
                departureDate: e.target.value
              })
            }
          />
        </div>
        <style jsx>{`
          form {
          }
          h1 {
            font-size: 16px;
          }
          label {
            text-align: right;
            display: inline-block;
            margin-right: 0.5rem;
            min-width: 110px;
            font-size: 12px;
          }
          input {
            display: inline-block;
            margin-bottom: 0.5rem;
            min-width: 200px;
          }
        `}</style>
      </form>
    );
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
    setNameAndHotelName: bindActionCreators(setNameAndHotelName, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  compose(
    graphql(getReservation, {
      options: props => ({
        variables: { id: props.id }
      }),
      name: "reservation"
    })
  )(UpdateFields)
);
