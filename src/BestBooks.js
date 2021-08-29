import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from "axios";
import AddBookForm from './AddBookForm';
import BookCard from './BookCard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';


class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super();
    this.state = {
      userBooks: [],
    }
  }

  async componentDidMount() {
    if (this.props.auth0.isAuthenticated) {
      let url = `http://localhost:3001/book?userName=${this.props.auth0.user.email}`;

      // console.log(this.props.auth0.user.email,);
      let userData = await axios.get(url);
      // console.log(userData.data);
      await this.setState({
        userBooks: userData.data,
      });
      console.log(userData.data);
    }

  }
  addNewBookToState = (data) => {
    this.setState({
      userBooks: data
    });

  }

   deleteBook = async (BookId) => {

    let url = await axios.delete(`${process.env.REACT_APP_SERVER_LINK}/deleteBook/${BookId}?ownerName=${this.props.auth0.user.email}`);
    this.setState({
      userBooks: url.data
    });
  }

  render() {
    return (
      <>

        <Jumbotron>
          <h1>My Favorite Books</h1>
          <p>
            This is a collection of my favorite books
          </p>
        </Jumbotron>

        <AddBookForm addToState={this.addNewBookToState} />

        {/* {this.props.auth0isAuthenticated && this.state.userBooks.map(item => {
          return <BookCard itemDetails={item} />
        })} */}

        <Row xs={1} md={3} className="g-4">
          {this.state.userBooks.map((item, idx) => (
            <BookCard itemDetails={item} deleteFunction={this.deleteBook} />
          ))}
        </Row>
      </>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
