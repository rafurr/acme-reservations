import React from "react";
import { bindActionCreators } from "redux";
import { initStore } from "../lib/store";
import withRedux from "next-redux-wrapper";

import withApollo from "../lib/withApollo";

import App from "../components/App";
import Header from "../components/Header";

import AddReservationForm from "../components/AddReservationForm";
import ReservationsList from "../components/ReservationsList";
import UpdateFields from "../components/UpdateFields";
import UpdateButton from "../components/UpdateButton";

class Index extends React.Component {
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

const mapDispatchToProps = dispatch => {
  return {};
};

export default withApollo(
  withRedux(initStore, null, mapDispatchToProps)(Index)
);
