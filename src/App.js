import './App.css';
import MainPage from './pages/MainPage'
import SecondPage from './pages/SecondPage'
import ThirdPage from './pages/ThirdPage'
import PayList from './pages/PayList'
// import React, { useState } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";

// import SecondPage from '/pages/SecondPage'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainPage}/>
        <Route exact path="/second" component={SecondPage}/>
        <Route exact path="/third" component={ThirdPage}/>
        <Route exact path="/qrcode" component={QRPage}/>
        <Route exact path="/payList" component={PayList}/>
      </Switch>
  </Router>
  );
}
export default App;
