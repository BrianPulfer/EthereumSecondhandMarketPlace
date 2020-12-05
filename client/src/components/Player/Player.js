import React from "react";

import {Image} from "react-bootstrap";

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
                <h5 className={header_class}>{this.props.name}</h5>
                <Image className={"player-image"} src={player_image} roundedCircle fluid />
            </div>
        );
    }
}

export default Player;