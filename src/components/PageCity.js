import React from "react";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";
import WeatherInfo from "./WeatherInfo";
import { Link } from "react-router-dom";
import "../styles/_pageCity.scss";

function PageCity({ weatherInfo }) {
  if (weatherInfo && weatherInfo.name) {
    return (
      <main className="main">
        <WeatherInfo weatherInfo={weatherInfo} showBack={true} />
      </main>
    );
  }
  return (
    <div className="go-back">
      <Link to="/">
        <Button content="Primary">Go back and select city</Button>
      </Link>
    </div>
  );
}

const mapsStateToProps = (state) => {
  return {
    city: state.items.city,
    loc: state.items.loc,
    weatherInfo: state.items.weatherInfo,
  };
};

export default connect(mapsStateToProps, null)(PageCity);
