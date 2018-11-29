import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { graphql } from "react-apollo";
import gql from "graphql-tag";

import { getReservations } from "./ReservationsList";
import { setAddReservationData } from "../lib/store";

const addReservation = gql`
  mutation addReservation(
    $name: String!
    $hotelName: String!
    $arrivalDate: String!
    $departureDate: String!
  ) {
    addReservation(
      name: $name
      hotelName: $hotelName
      arrivalDate: $arrivalDate
      departureDate: $departureDate
    ) {
      id
      name
      hotelName
      arrivalDate
      departureDate
    }
  }
`;

class AddReservationForm extends PureComponent {
  constructor(props) {
    super(props);

    this.addReservation = props.addReservation;
    this.setAddReservationData = props.setAddReservationData;
  }

  canAdd = () => {
    const {
      addReservationData: { name, hotelName, arrivalDate, departureDate }
    } = this.props;

    return (
      name.trim().length > 0 &&
      hotelName.trim().length > 0 &&
      arrivalDate &&
      departureDate
    );
  };

  handleSubmit = event => {
    const {
      addReservationData: { name, hotelName, arrivalDate, departureDate }
    } = this.props;

    event.preventDefault();

    const form = event.target;

    this.addReservation(name, hotelName, arrivalDate, departureDate);
    this.setAddReservationData({
      name: "",
      hotelName: "",
      arrivalDate: "",
      departureDate: ""
    });

    form.reset();
  };

  render() {
    const {
      addReservationData: { name, hotelName, arrivalDate, departureDate }
    } = this.props;

    const disabled = !this.canAdd();

    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Add Reservation</h1>
        <div>
          <label htmlFor="name">Name</label>
          <input
            autoComplete="off"
            placeholder="Enter Name"
            name="name"
            type="text"
            required
            value={name}
            onChange={e =>
              this.props.setAddReservationData({
                name: e.target.value,
                hotelName: hotelName,
                arrivalDate: arrivalDate,
                departureDate: departureDate
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
            value={hotelName}
            onChange={e =>
              this.props.setAddReservationData({
                name: name,
                hotelName: e.target.value,
                arrivalDate: arrivalDate,
                departureDate: departureDate
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
            pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
            value={arrivalDate}
            onChange={e =>
              this.props.setAddReservationData({
                name: name,
                hotelName: hotelName,
                arrivalDate: e.target.value,
                departureDate: departureDate
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
            pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
            value={departureDate}
            onChange={e =>
              this.props.setAddReservationData({
                name: name,
                hotelName: hotelName,
                arrivalDate: arrivalDate,
                departureDate: e.target.value
              })
            }
          />
        </div>
        <button disabled={disabled} type="submit">
          Add Reservation
        </button>
        <style jsx>{`
          form {
            margin-bottom: 1rem;
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

const mapStateToProps = ({ addReservationData }) => ({
  addReservationData
});

const mapDispatchToProps = dispatch => {
  return {
    setAddReservationData: bindActionCreators(setAddReservationData, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  graphql(addReservation, {
    props: ({ mutate }) => ({
      addReservation: (name, hotelName, arrivalDate, departureDate) =>
        mutate({
          variables: { name, hotelName, arrivalDate, departureDate },
          update: (proxy, { data: { addReservation } }) => {
            const data = proxy.readQuery({
              query: getReservations,
              variables: {}
            });
            proxy.writeQuery({
              query: getReservations,
              data: {
                ...data,
                getReservations: [addReservation, ...data.getReservations]
              },
              variables: {}
            });
          }
        })
    })
  })(AddReservationForm)
);
