import React, {Component} from 'react';
import {Col, Row} from "react-bootstrap";

import "./About.css";

class About extends Component{

    render() {
        return (
            <React.Fragment>
                <Row className={"AboutTitle"}>
                    <Col>
                        <h1 align={"center"}>About Ethereum Loups Garoux</h1>
                    </Col>
                </Row>
                <Row className={"AboutText"}>
                    <Col>
                        <p align={"center"}>
                            This project is a simple React Implementation of the popular board game "Loup Garou" (werewolf).<br/>
                            The project makes use of Ethereum smart contracts through the solidity programming language.<br/>
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