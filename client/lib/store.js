import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";

const exampleInitialState = {
  id: "",
  name: null,
  hotelName: null,
  arrivalDate: null,
  departureDate: null
};

export const actionTypes = {
  SET_ID: "SET_ID",
  SET_NAME: "SET_NAME",
  SET_HOTEL_NAME: "SET_HOTEL_NAME",
  SET_NAME_AND_HOTEL_NAME: "SET_NAME_AND_HOTEL_NAME"
};

//REDUCERS
export const reducer = (state = exampleInitialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ID:
      return {
        ...state,
        id: action.payload,
        name: null,
        hotelName: null,
        arrivalDate: null,
        departureDate: null
      };
    case actionTypes.SET_NAME:
      return {
        ...state,
        name: action.payload
      };
    case actionTypes.SET_HOTEL_NAME:
      return {
        ...state,
        hotelName: action.payload
      };
    case actionTypes.SET_NAME_AND_HOTEL_NAME:
      return {
        ...state,
        name: action.payload.name,
        hotelName: action.payload.hotelName,
        arrivalDate: action.payload.arrivalDate,
        departureDate: action.payload.departureDate
      };
    default:
      return state;
  }
};

// ACTIONS
export const setID = value => dispatch => {
  return dispatch({ type: actionTypes.SET_ID, payload: value });
};

export const setName = value => dispatch => {
  return dispatch({ type: actionTypes.SET_NAME, payload: value });
};

export const setHotelName = value => dispatch => {
  return dispatch({ type: actionTypes.SET_HOTEL_NAME, payload: value });
};

export const setNameAndHotelName = value => dispatch => {
  return dispatch({
    type: actionTypes.SET_NAME_AND_HOTEL_NAME,
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
