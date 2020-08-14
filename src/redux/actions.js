import { SET_CITY, SET_LOCATION, SET_WEATHER } from "./constants";

export function setCity(data) {
  return {
    type: SET_CITY,
    payload: data,
  };
}
export function setLocation(data) {
  return {
    type: SET_LOCATION,
    payload: data,
  };
}

export function setWeather(data) {
  return {
    type: SET_WEATHER,
    payload: data,
  };
}
