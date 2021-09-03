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
import BookModal from './BookModal';

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super();
    this.state = {
      userBooks: [],
      showModal: false,
      bookDetails:'',

    }
  }

  async componentDidMount() {
    if (this.props.auth0.isAuthenticated) {
      let url = `${process.env.REACT_APP_SERVER_LINK}/book?userName=${this.props.auth0.user.email}`;

      // console.log(this.props.auth0.user.email,);
      let userData = await axios.get(url);
      // console.log(userData.data);
      await this.setState({
        userBooks: userData.data,
      });
      console.log(userData.data,'dataaaaa');
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

  showModal =async (item) => {
    console.log(item, 'wwww');

   await this.setState({
      showModal: true,
      bookDetails: item
    });

  }

  hideModeal = () => {
    this.setState({
      showModal: false,
    })
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
            <BookCard
              key={idx}
              itemDetails={item}
              deleteFunction={this.deleteBook}
              showModal={this.showModal} />
          ))}
        </Row>

        <BookModal
          show={this.state.showModal}
          onHide={this.hideModeal}
          bookDetails={this.state.bookDetails} 
          addToState={this.addNewBookToState} />

      </>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
