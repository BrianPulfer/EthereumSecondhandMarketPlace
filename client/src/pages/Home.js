import React, {Component} from 'react';
import {Col, Row, Button} from "react-bootstrap";

import "./Home.css";
import Player from "../components/Player/Player";


class Home extends Component{

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className={"home-container"}>
                <Row className={"players-container"}>
                    <Col>
                        <Player name={"Player 1"} loup={this.props.roles[0]} dead={this.props.deads[0]}/>
                    </Col>
                    <Col>
                        <Player name={"Player 2"} loup={this.props.roles[1]} dead={this.props.deads[1]}/>
                    </Col>
                    <Col>
                        <Player name={"Player 3"} loup={this.props.roles[2]} dead={this.props.deads[2]}/>
                    </Col>
                    <Col>
                        <Player name={"Player 4"} loup={this.props.roles[3]} dead={this.props.deads[3]}/>
                    </Col>
                    <Col>
                        <Player name={"Player 5"} loup={this.props.roles[4]} dead={this.props.deads[4]}/>
                    </Col>
                </Row>
                <Row>
                        <Button className={"col-6 offset-3"} onClick={()=>{

                        }}>
                            Kill one player
                        </Button>
                </Row>
                <Row>
                    <Button className={"col-6 offset-3"} onClick={this.props.on_restart}>
                        Restart game
                    </Button>
                </Row>
            </div>
        )
    }
}

export default Home;