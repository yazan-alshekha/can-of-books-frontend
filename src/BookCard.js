import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class BookCard extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (

            // <Card style={{ width: '18rem' }}>
            //     <Card.Img variant="top" src={this.props.imageUrl} onClick={this.increase_likes_number_with_open_cart} />
            //     <Card.Body>
            //         <Card.Title>{this.props.itemDetails.title}</Card.Title>
            //         <Card.Text>
            //             {this.props.itemDetails.description}
            //         </Card.Text>
            //         <p>
            //             {this.props.itemDetails.email}
            //         </p>
            //         <p>
            //             {this.props.itemDetails.description}
            //         </p>
            //         <Button variant="primary" onClick={this.increase_likes_number}>Go somewhere</Button>
            //     </Card.Body>
            // </Card>
            <Col>
                <Card>

                    <Card.Body>
                        <Card.Title>{this.props.itemDetails.title}</Card.Title>
                        <Card.Text>
                            {this.props.itemDetails.email}
                        </Card.Text>
                        <Card.Text>
                            {this.props.itemDetails.availability}
                        </Card.Text>
                        <Card.Text>
                            {this.props.itemDetails.description}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        )
    }
}

export default BookCard;