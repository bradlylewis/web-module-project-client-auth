import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Login from './components/Login';
import FriendsList from './components/FriendsList';
import PrivateRoute from './components/PrivateRoute'
import axiosWithAuth from "./utils/axiosWithAuth"


function App() {

  const logout = () => {
    axiosWithAuth()
    .post('api/logout')
    .then(res => {
      localStorage.removeItem('token')
      localStorage.removeItem("role", res.data.role);
      localStorage.removeItem("username", res.data.username);
      window.location.href = '/'
    
    })
    .catch(error => {
      console.log(error);
    })
  }


  return (

      <Router>
    <div className="App">
      <header className="App-header">
        <h1>This be the friends</h1> 


        <Link to="/login">Login</Link>
        <Link onClick={logout}>logout</Link>


 
        <Switch>
          <PrivateRoute exact path = '/protected'>
            <FriendsList />

          </PrivateRoute>
          <Route exact path = '/login' component = {Login} />
          <Route component = {Login} />
        </Switch>
      </header>
    </div>
    </Router>

  );

}

export default App;