import React, { useState } from "react";
import "../App.css";
import moment from "moment";

//material-ui Typography
import { Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import { Button, Avatar } from "@material-ui/core";

//import keys from config file
import { API_KEY } from "../apis/config";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

function WeatherCard() {
  const classes = useStyles();
  const [city, setCity] = useState("Melbourne");
  const [results, setResults] = useState(null);

  // Openweather url + api key
  const weatherApi = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}&cnt=7`;

  // Fetch weather data
  const onSearch = () => {
    fetch(weatherApi)
      .then((response) => response.json())
      //Update results
      .then((results) => setResults(results));
  };

  //show data when user presses enter key
  const onKeyDown = (event) => {
    if (event.keyCode === 13) {
      onSearch();
    }
  };

  return (
    <>
      {/* Search input for city */}
      <div>
        <FormControl
          className={classes.margin}
          value="melbourne"
          // update city value with the user's input
          onChange={(event) => setCity(event.target.value)}
          // search value will be the currently selected city
          value={city}
          // onKeyDown (on press Enter)
          onKeyDown={onKeyDown}
        >
          <InputLabel htmlFor="input-with-icon-adornment">
            Enter City Name
          </InputLabel>

          <Input
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <LocationCityIcon color="primary" />
              </InputAdornment>
            }
          />

          {/* Search button */}
          <Button
            variant="contained"
            color="primary"
            className="button"
            onClick={onSearch}
          >
            Search
          </Button>
        </FormControl>
      </div>
      {results ? (
        <div className="ResultDiv">
          {/* city */}
          <div className="leftElements">
            <Typography variant="h4" component="h2" color="textSecondary">
              {results.city.name}
            </Typography>

            {/* Date */}
            <Typography
              variant="subtitle2"
              component="h2"
              color="textSecondary"
            >
              {moment(results.list[0].dt_txt).format("dddd, MMMM Do")}
            </Typography>
            {/* Weather Condition */}
            <Typography
              variant="subtitle2"
              component="h2"
              color="textSecondary"
            >
              {results.list[0].weather[0].main}
            </Typography>

            <div style={{ display: "flex", marginLeft: -10, fontSize: "bold" }}>
              <Avatar
                alt="Remy Sharp"
                src={`http://openweathermap.org/img/wn/${results.list[0].weather[0].icon}@2x.png`}
              />
              {/* Temperature */}
              <Typography
                variant="subtitle2"
                component="h2"
                color="textSecondary"
                style={{ fontSize: 26 }}
              >
                {Math.ceil(results.list[0].main.temp)} ℃
              </Typography>
            </div>
          </div>
          <div className="rightElEments">
            {/* Precipitation */}
            <Typography
              variant="subtitle2"
              component="h2"
              color="textSecondary"
            >
              <b>Precipitation</b>: {results.precipitation}
            </Typography>

            {/* Humidity */}
            <Typography
              variant="subtitle2"
              component="h2"
              color="textSecondary"
            >
              <b>Humidity:</b> {results.list[0].main.humidity}
            </Typography>

            {/* Wind */}
            <Typography
              variant="subtitle2"
              component="h2"
              color="textSecondary"
            >
              <b>Wind:</b> {Math.ceil(results.list[0].wind.speed)} kph
            </Typography>

            {/* Pollen Count */}
            <Typography
              variant="subtitle2"
              component="h2"
              color="textSecondary"
            >
              <b>Pollen Count:</b> 36
            </Typography>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default WeatherCard;
