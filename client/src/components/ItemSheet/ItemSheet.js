import React from 'react';

import {Card, Button, Row, Col} from 'react-bootstrap'

import "./ItemSheet.css";

class ItemSheet extends React.Component {
    constructor(props) {
        super(props);

        this.state = ({
             bidValue: this.props.bid
        });
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

    handleBid = async () => {
        var newBid = document.getElementById("bid-input").value

        const accounts = await window.ethereum.enable();
        const account = accounts[0];

        var weiBid = this.props.appState.web3.utils.toWei(''+newBid, "ether");

        var message = {
            from: account,
            value: weiBid,
            gas: 100000
        }

        const contract = this.props.appState.contract
        console.log(contract)

        const gas = await contract.methods.bid().estimateGas(message);
        message = {
            from: account,
            value: weiBid,
            gas: gas
        }

        const result = await contract.methods.bid().send(message)
        console.log(result);
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
                            <Row className={"bidding-form"}>
                                <form className={"col offset-3"}>
                                    <input className={"col"} id={"bid-input"} type={"text"} placeholder={"Insert your bid here"}/>
                                </form>
                                <Button className={"col"} variant="primary" onClick={this.handleBid}>
                                    Bid
                                </Button>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        )
    }
}

export default ItemSheet;