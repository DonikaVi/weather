import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Provider } from "react-redux";
import Store from '../src/redux/Store';
import "./styles/App.scss";
import Header from "./components/Header";
import MainPage from "./components/MainPage";
import Footer from "./components/Footer";
import PageCity from "./components/PageCity";

const API_KEY = "4cd26a9ca1dd9cefed859cf6822fadf7";

function App() {
  //navigator.geolocation.getCurrentPosition((r) => console.log(r), e => console.log(e));

  return (
    <div className="App">
      <Header />
      <Provider store={Store}>
      <Router>
      <Switch>
        <Route exact path="/">
          <MainPage apiKey={API_KEY} />
        </Route>
        <Route exact path="/">
          <MainPage apiKey={API_KEY} />
        </Route>
        <Route path="/city/" children={<PageCity />} />
      </Switch>
      </Router>
      </Provider>
      <Footer />
    </div>
  );
}

export default App;
