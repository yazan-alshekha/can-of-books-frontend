import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';


class AddBookForm extends React.Component {
    submitFormData = async (event) => {
        event.preventDefault();
        let NewBook = {
            ownerName: this.props.auth0.user.email,
            bookTitlename: event.target.titleName.value,
            description: event.target.description.value,
            availability: event.target.availability.value,
        }
        
        let url =await axios.post(`${process.env.REACT_APP_SERVER_LINK}/addBook?`,NewBook);
    
        this.props.addToState(url.data);
    }


    render() {
        return (
            <>
                <Form onSubmit={this.submitFormData}>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Title Name </Form.Label>
                        <Form.Control type="text" placeholder="Add your title here" name="titleName" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" placeholder="Enter your description here" name="description" />
                    </Form.Group>
                    <Form.Check type="radio" label="Available" name="availability" value="available" />
                    <Form.Check type="radio" label="Unavailable" name="availability" value="unavailable" />
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </>
        )
    }

}



export default  withAuth0(AddBookForm);