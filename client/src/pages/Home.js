import React, {Component} from 'react';
import {Col, Row, Button} from "react-bootstrap";

import "./Home.css";
import Player from "../components/Player/Player";

const NUMBER_PLAYERS = 5;
const LOUPS_PERCENTAGE = 0.2;

class Home extends Component{

    constructor(props) {
        super(props);

        const nr_wolves = Math.floor(NUMBER_PLAYERS * LOUPS_PERCENTAGE);

        let roles = []
        let deads = []

        // Randomly initializing player roles
        for(let i = 0; i<NUMBER_PLAYERS; i++){
            roles.push(nr_wolves > roles.length)
            deads.push(false)
        }

        this.state = {
            nr_players : NUMBER_PLAYERS,
            roles : shuffle(roles),
            deads: deads
        }
    }

    render() {
        console.log(this.state)

        return (
            <div className={"home-container"}>
                <Row className={"players-container"}>
                    <Col>
                        <Player name={"Player 1"} loup={this.state.roles[0]} dead={this.state.deads[0]}/>
                    </Col>
                    <Col>
                        <Player name={"Player 2"} loup={this.state.roles[1]} dead={this.state.deads[1]}/>
                    </Col>
                    <Col>
                        <Player name={"Player 3"} loup={this.state.roles[2]} dead={this.state.deads[2]}/>
                    </Col>
                    <Col>
                        <Player name={"Player 4"} loup={this.state.roles[3]} dead={this.state.deads[3]}/>
                    </Col>
                    <Col>
                        <Player name={"Player 5"} loup={this.state.roles[4]} dead={this.state.deads[4]}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button onClick={()=>{
                            let status = this.state.deads;
                            status[Math.floor(Math.random() * this.state.nr_players)] = true;
                            this.setState({
                                deads: status
                            });
                        }}>
                            Kill one player
                        </Button>
                    </Col>
                </Row>
            </div>
        )
    }
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

export default Home;