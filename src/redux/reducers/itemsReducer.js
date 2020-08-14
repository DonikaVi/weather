import {SET_LOCATION, SET_CITY, SET_WEATHER} from "../constants";

const initialState = {
  city: null,
  loc: {},
  weatherInfo: {},
};
export default function items(state = initialState, action) {
  switch (action.type) {
    case SET_CITY:
      return {
        ...state,
        city: action.payload,
      };
    case SET_LOCATION:
      return {
        ...state,
        loc: action.payload,
      };
    case SET_WEATHER:
      return {
        ...state,
        weatherInfo: action.payload,
      };
    default:
      return state;
  }
}
