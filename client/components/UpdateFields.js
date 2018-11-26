import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { graphql } from "react-apollo";
import gql from "graphql-tag";

import { setSelectedReservationData } from "../lib/store";

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

const UpdateFields = props => {
  const {
    selectedReservationData: {
      id,
      name,
      hotelName,
      arrivalDate,
      departureDate,
      isEditing
    },
    data: { getReservation }
  } = props;

  if (!getReservation || !id) {
    return null;
  }

  let nameValue, hotelNameValue, arrivalDateValue, departureDateValue;

  if (isEditing) {
    nameValue = name;
    hotelNameValue = hotelName;
    arrivalDateValue = arrivalDate;
    departureDateValue = departureDate;
  } else {
    nameValue = getReservation.name;
    hotelNameValue = getReservation.hotelName;
    arrivalDateValue = getReservation.arrivalDate;
    departureDateValue = getReservation.departureDate;
  }

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
          placeholder="Enter Name"
          name="name"
          type="text"
          required
          value={nameValue}
          onChange={e =>
            props.setSelectedReservationData({
              id: id,
              name: e.target.value,
              hotelName: hotelNameValue,
              arrivalDate: arrivalDateValue,
              departureDate: departureDateValue,
              isEditing: true
            })
          }
        />
      </div>
      <div>
        <label htmlFor="hotelName">Hotel</label>
        <input
          autoComplete="off"
          placeholder="Enter Hotel"
          name="hotelName"
          type="text"
          required
          value={hotelNameValue}
          onChange={e =>
            props.setSelectedReservationData({
              id: id,
              name: nameValue,
              hotelName: e.target.value,
              arrivalDate: arrivalDateValue,
              departureDate: departureDateValue,
              isEditing: true
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
            props.setSelectedReservationData({
              id: id,
              name: nameValue,
              hotelName: hotelNameValue,
              arrivalDate: e.target.value,
              departureDate: departureDateValue,
              isEditing: true
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
            props.setSelectedReservationData({
              id: id,
              name: nameValue,
              hotelName: hotelNameValue,
              arrivalDate: arrivalDateValue,
              departureDate: e.target.value,
              isEditing: true
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
};

const mapStateToProps = ({ selectedReservationData }) => ({
  selectedReservationData
});

const mapDispatchToProps = dispatch => {
  return {
    setSelectedReservationData: bindActionCreators(
      setSelectedReservationData,
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  graphql(getReservation, {
    options: props => ({
      variables: { id: props.selectedReservationData.id }
    }),
    props: ({ data }) => ({
      data
    })
  })(UpdateFields)
);
