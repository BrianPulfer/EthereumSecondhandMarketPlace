import React, {Component} from 'react';
import {Col, Row, Button} from "react-bootstrap";

import ItemSheet from "../components/ItemSheet/ItemSheet";

import "./Home.css";

class Home extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        const appState = this.props.appState;

        let itemsSheet = []
        for(let i = 0; i<appState.itemsTitles.length; i++){
            itemsSheet.push(
                <ItemSheet
                    title={appState.itemsTitles[i]}
                    image={appState.itemsImages[i]}
                    description={appState.itemsDescriptions[i]}
                    beneficiary={appState.beneficiaries[i]}
                    bid={appState.highestBids[i]}
                    finishTime={appState.finishTimes[i]}
                />
            )
        }
        return (
            <div className={"home-container"}>
                <div className={"items-sheets-container"}>
                    {itemsSheet}
                </div>
            </div>
        )
    }
}

export default Home;