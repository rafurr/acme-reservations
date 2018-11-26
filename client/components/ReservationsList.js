import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setSelectedReservationData } from "../lib/store";

import { graphql } from "react-apollo";
import gql from "graphql-tag";

import ErrorMessage from "./ErrorMessage";

export const getReservations = gql`
  query getReservations($offset: Int, $limit: Int) {
    getReservations(offset: $offset, limit: $limit) {
      __typename
      id
      name
      hotelName
      arrivalDate
      departureDate
    }
  }
`;

const ReservationsList = props => {
  const handleSelect = item => {
    props.setSelectedReservationData(Object.assign({ isEditing: false }, item));
  };

  const {
    selectedReservationData: { id },
    data: { getReservations }
  } = props;

  if (!getReservations || getReservations.error)
    return <ErrorMessage message="Error loading posts." />;

  if (getReservations && getReservations.length) {
    return (
      <section>
        <h1>Reservations</h1>
        <ul>
          {getReservations.map((item, index) => (
            <li key={item.id} onClick={e => handleSelect(item)}>
              <div className={id === item.id ? "selected" : ""}>
                {item.name} | {item.hotelName} | Arrival: {item.arrivalDate} |
                Departure: {item.departureDate}
              </div>
            </li>
          ))}
        </ul>
        <style jsx>{`
          section {
            margin-bottom: 1rem;
          }
          h1 {
            font-size: 16px;
          }
          ul {
            border: 1px solid #ececec;
            margin: 0;
            padding: 0.5rem 0.5rem 0 0.5rem;
          }
          li {
            cursor: pointer;
            display: block;
            margin-bottom: 10px;
          }
          div {
            align-items: center;
            display: flex;
          }
          .selected {
            background: #b3d6fd;
          }
        `}</style>
      </section>
    );
  }
  return <div>Loading</div>;
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
  graphql(getReservations, {
    options: {
      variables: {}
    },
    props: ({ data }) => ({
      data
    })
  })(ReservationsList)
);
