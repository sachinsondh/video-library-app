import "./App.css";
import Movies from "./components/movies";
import { Route, Redirect, Switch } from "react-router-dom";
import NavBar from "./components/navbar";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notfound";
import MovieForm from './components/movie-form';
import LoginForm from './components/login-form';
import { Component } from 'react';
import RegisterForm from './components/register-form';

function App() {
  return (
    <main className="container">
      <div>
        <NavBar />
        <div class="content">
          <Switch>
          
            <Route path="/login/" component={LoginForm} />
            <Route path="/register/" component={RegisterForm} />
            <Route path="/movies/:id" component={MovieForm} />
            <Route path="/movies/new" component={MovieForm} />
            <Route path="/movies/" component={Movies} />
            <Route path="/customers/" component={Customers} />
            <Route path="/rentals/" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/" exact component={Movies} />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </div>
    </main>
  );
}

export default App;
