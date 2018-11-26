import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { getReservations } from "./ReservationsList";

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

function AddReservationForm({ addReservation }) {
  function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;

    const formData = new window.FormData(form);
    const name = formData.get("name");
    const hotelName = formData.get("hotelName");
    const arrivalDate = formData.get("arrivalDate");
    const departureDate = formData.get("departureDate");
    console.log(arrivalDate);
    addReservation(name, hotelName, arrivalDate, departureDate);

    form.reset();
  }

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
          onChange={e => console.log(e.target.value)}
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
}

export default graphql(addReservation, {
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
})(AddReservationForm);
