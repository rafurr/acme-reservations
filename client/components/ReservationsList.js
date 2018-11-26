import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setID } from "../lib/store";

import { graphql, compose } from "react-apollo";
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

class ReservationsList extends Component {
  handleSelect = item => {
    this.props.setID(item.id);
  };

  render() {
    const {
      id,
      data: { getReservations }
    } = this.props;

    if (getReservations.error)
      return <ErrorMessage message="Error loading posts." />;

    if (getReservations && getReservations.length) {
      return (
        <section>
          <h1>Reservations</h1>
          <ul>
            {getReservations.map((item, index) => (
              <li key={item.id} onClick={e => this.handleSelect(item)}>
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
            .selected {
              background: #b3d6fd;
            }
            li {
              display: block;
              margin-bottom: 10px;
            }
            div {
              align-items: center;
              display: flex;
            }
            a {
              font-size: 14px;
              margin-right: 10px;
              text-decoration: none;
              padding-bottom: 0;
              border: 0;
            }
            span {
              font-size: 14px;
              margin-right: 5px;
            }
            ul {
              border: 1px solid #ececec;
              margin: 0;
              padding: 0.5rem 0.5rem 0 0.5rem;
            }
          `}</style>
        </section>
      );
    }
    return <div>Loading</div>;
  }
}

const mapStateToProps = ({ id }) => ({ id });

const mapDispatchToProps = dispatch => {
  return {
    setID: bindActionCreators(setID, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  compose(
    graphql(getReservations, {
      options: {
        variables: {}
      },
      props: ({ data }) => ({
        data
      })
    })
  )(ReservationsList)
);
