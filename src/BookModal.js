import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
class BookModal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            title: '',
        }
    }

    saveUpdate = async (event) => {
        event.preventDefault();
        let formInformation = {
            email: this.props.bookDetails.email,
            id: this.props.bookDetails._id,
            title: event.target.bookTitle.value,
            description: event.target.bookdescription.value,
            availability: event.target.availability.value,
        }
        let url = await axios.put(`${process.env.REACT_APP_SERVER_LINK}/update`, formInformation);
        await this.props.addToState(url.data);
        this.props.onHide();
    }

    render() {
        return (
            <>
                <Modal
                    show={this.props.show}
                    onHide={this.props.onHide}
                    backdrop="static"
                    keyboard={false}>

                    <Form onSubmit={this.saveUpdate}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Book Title</Form.Label>
                            <Form.Control name='bookTitle' type="text" defaultValue={this.props.bookDetails.title} required/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control name='bookdescription' as="textarea" rows={3} defaultValue={this.props.bookDetails.description} required/>
                        </Form.Group>
                        <Form.Check type="radio" label="Available" name="availability" value="available" required/>
                        <Form.Check type="radio" label="Unavailable" name="availability" value="unavailable" />
                        <Button variant="secondary" onClick={this.props.onHide}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            Save
                        </Button>
                    </Form>
                </Modal>
            </>
        );
    }
}

export default BookModal;