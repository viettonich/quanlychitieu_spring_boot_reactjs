import React from 'react';
import './App.css';
import Menu from '../Menu/Menu';
import Addition from '../Pane/Additon/Addition';
import Search from '../Pane/Search/Search';
import Report from '../Pane/Report/Report';
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Menu></Menu>
        <div>
          <Route exact path="/" component={Report} />
          <Route path="/add-consumption" component={Addition} />
          <Route path="/search" component={Search} />
          <Route path="/report" component={Report} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
