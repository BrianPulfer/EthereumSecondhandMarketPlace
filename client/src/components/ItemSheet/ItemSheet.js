import React from 'react';

import {Card, Button, Row, Col} from 'react-bootstrap'

import "./ItemSheet.css";

class ItemSheet extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        // let timeLeft = this.props.finishTime
        let timeLeft = "1h 23mins";

        return (
            <Row>
                <Col>
                    <Card className={"item-sheet"}>
                        <Card.Img variant="top" src={this.props.image}/>
                        <Card.Body>
                            <Card.Title>{this.props.title}</Card.Title>
                            <Card.Text>
                                {this.props.description}
                            </Card.Text>
                            <h2>{timeLeft}</h2>
                            <Button className={"col-6 offset-3"} variant="primary">Bid</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        )
    }
}

export default ItemSheet;