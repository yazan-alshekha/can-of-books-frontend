import React from 'react';
import Header from './Header';
import IsLoadingAndError from './IsLoadingAndError';
import Footer from './Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Profile from './Profile'
import Login from './Login.js';
import BestBooks from './BestBooks.js';
import { withAuth0 } from '@auth0/auth0-react';

class App extends React.Component {

  

  render() {
    console.log('app', this.props);
    return (
      <>
        <Router>
          {/* <IsLoadingAndError> */}
          <Header />
          <Switch>
            <Route exact path="/">
              {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
              
              {this.props.auth0.isAuthenticated ? <BestBooks /> : <Login />}
            </Route>
            {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
            <Route path='/profile'>
              <Profile />
            </Route>
          </Switch>

           {/* if you would like to redirect after login in you can yse built in  component  'Redirect' */}
          {/* {this.props.auth0.isAuthenticated && <Redirect to='/profile' />  } */}

          <Footer />
          {/* </IsLoadingAndError> */}
        </Router>
      </>
    );
  }
}


export default withAuth0(App);
