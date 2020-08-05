import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import UserLoginPage from './components/UserLoginPage';
import RewardsPage from './components/RewardsPage';
import '@progress/kendo-theme-bootstrap/dist/all.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
         <Route exact path= '/' component={UserLoginPage}/>
         <Route exact path= '/login' component={UserLoginPage}/>
         <Route path='/rewards' component={RewardsPage}/>
         </Switch>
      </div>
    );
  }
}

export default App;
