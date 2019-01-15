import React from "react";
import LoginPage from "./components/LoginPage";
import EmailPage from "./components/EmailPage";
import ConfirmationPage from "./components/ConfirmationPage";
import ResendPage from "./components/ResendPage";
import { Route } from "react-router-dom";

const App = () => (
  <div className="App">
    <Route path="/" exact component={LoginPage} />
    <Route path="/email" exact component={EmailPage} />
    <Route path="/confirmation" exact component={ConfirmationPage} />
    <Route path="/trial" exact component={ResendPage} />
  </div>
);

export default App;
