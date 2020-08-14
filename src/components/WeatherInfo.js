import React from "react";
import { Button, Container, List, Statistic } from "semantic-ui-react";
import { fromUnixTime } from "date-fns";
import { Link } from "react-router-dom";
function WeatherInfo({ weatherInfo, showBack }) {
  const sunsetTime = fromUnixTime(weatherInfo.sys.sunset);
  const sunriseTime = fromUnixTime(weatherInfo.sys.sunrise);
  const tempMain = Math.round(weatherInfo.main.temp);
  const tempMin = Math.floor(weatherInfo.main.temp_min);
  const tempMax = Math.ceil(weatherInfo.main.temp_max);

  return (
    <>
      <Container className="content-weather">
        Погода в {weatherInfo.name} сейчас
      </Container>

      <Container className={"content-weather-left"} textAlign="center">
        <Statistic>
          <Statistic.Value>{tempMain} °C</Statistic.Value>
        </Statistic>
        <List>
          <List.Item>Скорость ветра: {weatherInfo.wind.speed} м/с</List.Item>
          <List.Item>Восход: {sunriseTime.toLocaleTimeString()}</List.Item>
          <List.Item>Заход: {sunsetTime.toLocaleTimeString()}</List.Item>
          <List.Item>Максимальная температура сегодня: {tempMax} °C</List.Item>
          <List.Item>Минимальная температура сегодня: {tempMin} °C</List.Item>
        </List>
      </Container>
      {showBack && (
        <Container>
          <div className="go-back">
            <Link to="/">
              <Button content="Primary">Go back and select city</Button>
            </Link>
          </div>
        </Container>
      )}
    </>
  );
}

export default WeatherInfo;
