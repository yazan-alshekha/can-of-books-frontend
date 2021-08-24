import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from "axios";

class MyFavoriteBooks extends React.Component {

  async componentDidMount() {
    if (this.props.auth0.isAuthenticated) {
        let url = `http://localhost:3001/book?userName=${this.props.auth0.user.email}`;

        console.log(this.props.auth0.user.email);
        let userData = await axios.get(url);
        console.log(userData.data);
    }

}


  render() {
    return(
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>
      </Jumbotron>
    )
  }
}

export default withAuth0( MyFavoriteBooks);
