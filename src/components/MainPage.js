import React from "react";
import { connect } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../styles/_mainPage.scss";
import "../App.js";
import { Divider, Button, Form, Select, Grid } from "semantic-ui-react";
import WeatherInfo from "./WeatherInfo";
import { setCity, setLocation, setWeather } from "../redux/actions";

const cityOptions = [
  { key: "od", value: "Odessa", text: "Odessa" },
  { key: "ki", value: "Kyiv", text: "Kyiv" },
  { key: "ca", value: "Cairns", text: "Cairns" },
  { key: "lo", value: "London", text: "London" },
  { key: "ma", value: "Málaga", text: "Málaga" },
  { key: "am", value: "Amsterdam", text: "Amsterdam" },
];

function MainPage(props) {
  const history = useHistory();
  const { weatherInfo, city, loc } = props;

  const handleChange = async (e, data) => {
    props.dispatchSetCity(data.value);
  };

  useEffect(() => {
    async function fetchData() {
      if (city) {
        await weatherForecast();
      }
    }
    fetchData();
  }, [city]);

  const weatherForecast = async () => {
    const api_url = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${props.apiKey}`
    );
    const data = await api_url.json();
    props.dispatchSetWeather(data);
  };

  function handleSubmit() {
    history.push("/city");
  }

  const weatherPosition = async (position) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${position.latitude}&lon=${position.longitude}&units=metric&appid=${props.apiKey}`
      );
      const weather = await res.json();
      props.dispatchSetWeather(weather);
    } catch (e) {}
  };

  const handleSuccess = async (position) => {
    const { latitude, longitude } = position.coords;
    props.dispatchSetLocation({
      latitude,
      longitude,
    });

    await weatherPosition(position.coords);
  };

  const handleError = (error) => {
    console.warn(error);
  };

  useEffect(() => {
    const { geolocation } = navigator;
    if (!geolocation) {
      console.warn("Geolocation not supported");
      return;
    }
    geolocation.getCurrentPosition(
      handleSuccess,
      handleError,
    );
  }, []);

  return (
    <main className="main">
      <div className="content">
        <Form onSubmit={handleSubmit} className={"form"}>
          <p>У природы нет плохой погоды в городе: {city || weatherInfo.name}</p>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column mobile={13} width={13}>
                <Form.Field>
                  <Select
                    onChange={handleChange}
                    placeholder="Выберите город"
                    name="city"
                    options={cityOptions}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column mobile={3} width={3}>
                <Button type="submit">OK</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>

        {weatherInfo.name && <WeatherInfo weatherInfo={weatherInfo} />}

        <Divider />
      </div>
    </main>
  );
}

const mapsStateToProps = (state) => {
  return {
    city: state.items.city,
    loc: state.items.loc,
    weatherInfo: state.items.weatherInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchSetCity: (data) => {
      dispatch(setCity(data));
    },
    dispatchSetLocation: (data) => {
      dispatch(setLocation(data));
    },
    dispatchSetWeather: (data) => {
      dispatch(setWeather(data));
    },
  };
};

export default connect(mapsStateToProps, mapDispatchToProps)(MainPage);
