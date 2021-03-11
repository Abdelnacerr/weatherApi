import "./App.css";
import WeatherApi from "./components/WeatherApi";

//Roboto font
import "fontsource-roboto";
//material-ui Typography
import { Typography } from "@material-ui/core";

function App() {
  return (
    <div className="App">
      <Typography variant="h2" component="h2">
        Weather App
      </Typography>
      <WeatherApi />
    </div>
  );
}

export default App;
