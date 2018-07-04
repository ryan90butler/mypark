import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard';
import UpdateUser from './Components/UpdateUser/UpdateUser';
import AddPark from './Components/AddPark/AddPark';
import Details from './Components/Details/Details';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Router>
        <Switch>
        <Route path={`/dashboard`} component={Dashboard}/>
        <Route path={`/new-user`} component={Register}/>
        <Route path={`/updateuser`} component={UpdateUser}/>
        <Route path={`/addpark`} component={AddPark}/>
        <Route path={`/details/:id`} component={Details}/>
        <Route path={`/`}  component={Login}/>
        </Switch>
      </Router>

      </div>
    );
  }
}

export default App;
