import React from "react";

import {Image, Row, Col} from "react-bootstrap";

import LoupImage from "./loup.png";
import CivileImage from "./civile.png";

import "./Player.css";

class Player extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {
        const header_class = this.props.dead ? "header-dead" : "header-alive";
        const player_image = this.props.loup ? LoupImage : CivileImage;

        return (
            <div className={"player"}>
                <Row>
                    <Col>
                        <h5 className={header_class} align={"center"}>{this.props.name}</h5>
                    </Col>
                </Row>
                <Row>
                    <Image className={"player-image col"} src={player_image}  roundedCircle fluid />
                </Row>
            </div>
        );
    }
}

export default Player;