import React, { Component } from "react";
import withRedux from "next-redux-wrapper";

import withApollo from "../lib/withApollo";

import { initStore } from "../lib/store";

import App from "../components/App";
import Header from "../components/Header";
import AddReservationForm from "../components/AddReservationForm";
import ReservationsList from "../components/ReservationsList";
import UpdateFields from "../components/UpdateFields";
import UpdateButton from "../components/UpdateButton";

class Index extends Component {
  static getInitialProps({ store, isServer }) {
    // store.dispatch(init());
    return { isServer };
  }

  render() {
    return (
      <App>
        <Header />
        <AddReservationForm />
        <ReservationsList />
        <UpdateFields />
        <UpdateButton />
      </App>
    );
  }
}

export default withApollo(withRedux(initStore, null, null)(Index));
