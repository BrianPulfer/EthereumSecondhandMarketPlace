import React, {Component} from 'react';
import {Col, Row} from "react-bootstrap";

import "./About.css";

class About extends Component{

    render() {
        return (
            <React.Fragment>
                <Row className={"AboutTitle"}>
                    <Col>
                        <h1 align={"center"}>About Ethereum Second-hand Marketplace</h1>
                    </Col>
                </Row>
                <Row className={"AboutText"}>
                    <Col>
                        <p align={"center"}>
                            This project is a simple Implementation of a second-hand online marketplace based on the Ethereum protocol.<br/>
                            The project makes use of Ethereum smart contracts through the solidity programming language and the truffle-react scaffholding. The web framework used are React and React-Bootstrap.<br/>
                            <br/>
                            <b>Authors: </b> Brian Pulfer, Michael Mazourik.
                        </p>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

export default About;