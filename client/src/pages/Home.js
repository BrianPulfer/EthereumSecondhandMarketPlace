import React, {Component} from 'react';
import {Button, Form} from "react-bootstrap";

import ItemSheet from "../components/ItemSheet/ItemSheet";

import "./Home.css";

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const appState = this.props.appState;

        let itemSheets = []
        for (let i = 0; i < appState.itemsTitles.length; i++) {
            itemSheets.push(
                <ItemSheet
                    key={i}
                    title={appState.itemsTitles[i]}
                    image={appState.itemsImages[i]}
                    description={appState.itemsDescriptions[i]}
                    beneficiary={appState.beneficiaries[i]}
                    bid={appState.highestBids[i]}
                    finishTime={appState.finishTimes[i]}
                    appState={appState}
                />
            )
        }

        return (
            <div className={"home-container"}>
                <div className={"form-container"} hidden={true}>
                    <Form className={"auction-form"}>
                        <Form.Row>
                            <Form.Control id={"auction-title"} placeholder={"Title"} className={"col-6 offset-3"}/>
                        </Form.Row>
                        <Form.Row>
                            <Form.Control id={"auction-image"} placeholder={"Image URL"} className={"col-6 offset-3"}/>
                        </Form.Row>
                        <Form.Row>
                            <Form.Control id={"auction-description"} as={"textarea"} rows={3} placeholder={"Description"}
                                          className={"col-6 offset-3"}/>
                        </Form.Row>
                        <Form.Row>
                            <Form.Control id={"auction-duration"} as="select" className={"col-6 offset-3"} defaultValue="Auction duration...">
                                <option>1hr</option>
                                <option>2hrs</option>
                                <option>3hrs</option>
                                <option>4hrs</option>
                                <option>5hrs</option>
                            </Form.Control>
                        </Form.Row>
                        <Form.Row>
                            <Button onClick={handleNewAuction.bind(this)} title={"Sell a new item"}
                                    className={"add-item-btn btn-success col-8 offset-2"}>
                                New auction
                            </Button>
                        </Form.Row>
                    </Form>
                </div>
                <div className={"items-sheets-container"}>
                    {itemSheets}
                </div>
            </div>
        )
    }
}

function handleNewAuction(){
    let title = document.getElementById("auction-title").value;
    let image = document.getElementById("auction-image").value;
    let description = document.getElementById("auction-description").value;
    let duration = document.getElementById("auction-duration").value.split("h")[0];

    this.props.onNewAuction(title, image, description, duration);
}

export default Home;