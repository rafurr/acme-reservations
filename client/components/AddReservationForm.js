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

const AddReservationForm = props => {
  const {
    name,
    hotelName,
    arrivalDate,
    departureDate
  } = props.addReservationData;

  const handleSubmit = event => {
    const {
      name,
      hotelName,
      arrivalDate,
      departureDate
    } = props.addReservationData;

    event.preventDefault();

    const form = event.target;

    props.addReservation(name, hotelName, arrivalDate, departureDate);
    props.setAddReservationData({
      name: "",
      hotelName: "",
      arrivalDate: "",
      departureDate: ""
    });

    form.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
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
            props.setAddReservationData({
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
            props.setAddReservationData({
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
            props.setAddReservationData({
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
            props.setAddReservationData({
              name: name,
              hotelName: hotelName,
              arrivalDate: arrivalDate,
              departureDate: e.target.value
            })
          }
        />
      </div>
      <button type="submit">Add Reservation</button>
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
};

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
