import React from 'react';

import {Card, Button, Row, Col} from 'react-bootstrap'

import "./ItemSheet.css";

class ItemSheet extends React.Component {
    constructor(props) {
        super(props);
    }

    getTimeLeft(finishTime){
        let timeInSeconds = (finishTime - new Date().getTime()) / 1000;

        if(timeInSeconds > 60){
            let timeInMinutes = timeInSeconds / 60
            timeInSeconds = timeInSeconds % 60
            if(timeInMinutes > 60){
                let timeInHours = timeInMinutes / 60
                timeInMinutes = timeInMinutes % 60
                return Math.floor(timeInHours)+"h "+Math.floor(timeInMinutes)+"m "+Math.floor(timeInSeconds)+"s";
            }
            return Math.floor(timeInMinutes)+"m "+Math.floor(timeInSeconds)+"s"
        }
        return Math.floor(timeInSeconds)+"s"
    }

    render() {
        // let timeLeft = this.props.finishTime
        let timeLeft = this.getTimeLeft(this.props.finishTime);

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
                            <h1>{this.props.bid} ETH</h1>
                            <Button className={"col-6 offset-3"} variant="primary">Bid</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        )
    }
}

export default ItemSheet;