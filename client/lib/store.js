import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";

const exampleInitialState = {
  addReservationData: {
    name: "",
    hotelName: "",
    arrivalDate: "",
    departureDate: ""
  },
  selectedReservationData: {
    id: "",
    name: "",
    hotelName: "",
    arrivalDate: "",
    departureDate: "",
    isEditing: false
  }
};

export const actionTypes = {
  SET_ADD_RESERVATION_DATA: "SET_ADD_RESERVATION_DATA",
  SET_SELECTED_RESERVATION_DATA: "SET_SELECTED_RESERVATION_DATA"
};

//REDUCERS
export const reducer = (state = exampleInitialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ADD_RESERVATION_DATA:
      return {
        ...state,
        addReservationData: action.payload
      };
    case actionTypes.SET_SELECTED_RESERVATION_DATA:
      return {
        ...state,
        selectedReservationData: action.payload
      };
    default:
      return state;
  }
};

// ACTIONS
export const setAddReservationData = value => dispatch => {
  return dispatch({
    type: actionTypes.SET_ADD_RESERVATION_DATA,
    payload: value
  });
};

export const setSelectedReservationData = value => dispatch => {
  return dispatch({
    type: actionTypes.SET_SELECTED_RESERVATION_DATA,
    payload: value
  });
};

export const initStore = (initialState = exampleInitialState) => {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
};
