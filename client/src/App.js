// React, Web3 and Ethereum contracts
import React, {Component} from "react";
import SimpleAuctionContract from "./contracts/SimpleAuction.json";
import getWeb3 from "./getWeb3";

// Own Components
import Home from "./pages/Home";
import About from "./pages/About";
import CustomNavbar from "./components/CustomNavbar/CustomNavbar";
import CustomFooter from "./components/CustomFooter/CustomFooter";

// Stylesheets
import "./App.css";

// React bootstrap
import {Container} from "react-bootstrap";

// React-Router
import {BrowserRouter, Switch, Route} from "react-router-dom"


class App extends Component {

    static async getContract() {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();

        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = SimpleAuctionContract.networks[networkId];
        return new web3.eth.Contract(
            SimpleAuctionContract.abi,
            deployedNetwork && deployedNetwork.address,
        );
    }

    constructor() {
        super();

        let itemsTitles = ["Playstation 5"]
        let itemsImages = ["https://www.inputmag.dk/wp-content/uploads/2020/06/2020_0611_playstation5.jpg"]
        let itemsDescriptions = ["Selling brand new playstation 5. Perfect conditions. Selling to the best bidder."]
        let beneficiaries = []
        let highestBids = []
        let finishTimes = []

        // this.onNewAuction = this.onNewAuction.bind(this);

        this.state = {
            itemsTitles: itemsTitles,
            itemsImages: itemsImages,
            itemsDescriptions: itemsDescriptions,
            beneficiaries: beneficiaries,
            highestBids: highestBids,
            finishTimes: finishTimes,
            web3: null,
            accounts: null,
            contract: null
        };
    }

    /*
    onNewAuction(title, image, description, duration) {
        let titles = this.state.itemsTitles;
        let images = this.state.itemsImages;
        let descriptions = this.state.itemsDescriptions;
        let beneficiaries = this.state.beneficiaries;
        let bids = this.state.highestBids;
        let finishTimes = this.state.finishTimes;

        titles.push(title);
        images.push(image);
        descriptions.push(description);
        beneficiaries.push(null); // TODO Handle
        bids.push(0);
        finishTimes.push(new Date().getTime() + duration * 60 * 60 * 1000);

        this.setState({
            itemsTitles: titles,
            itemsImages: images,
            itemsDescriptions: descriptions,
            beneficiaries: beneficiaries,
            highestBids: bids,
            finishTimes: finishTimes
        });
    }
     */

    componentDidMount = async () => {
        try {
            // Get network provider and web3 instance.
            const web3 = await getWeb3();

            // Use web3 to get the user's accounts.
            const accounts = await web3.eth.getAccounts();

            // Get the contract instance.
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = SimpleAuctionContract.networks[networkId];
            const instance = new web3.eth.Contract(
                SimpleAuctionContract.abi,
                deployedNetwork && deployedNetwork.address,
            );

            // TODO: Find state of the app from contract.
            const bidIncreases = await instance.getPastEvents("HighestBidIncreased",
                {
                    fromBlock: 0,
                    toBlock: 'latest'
                });

            var highestBids = []
            for(let i = 0; i<bidIncreases.length; i++){
                highestBids.push(bidIncreases[i].returnValues[1])
            }

            const endTime = await instance.methods.get_time().call()
            var finishTimes = this.state.finishTimes
            finishTimes.push(endTime)

            console.log(endTime)
            console.log(new Date().getTime()/1000)

            // Set web3, accounts, and contract to the state, and then proceed with an
            // example of interacting with the contract's methods.
            this.setState(
                {
                    web3: web3,
                    accounts: accounts,
                    contract: instance,
                    highestBids: highestBids,
                    finishTimes: finishTimes
                }
            );
        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
        }
    };

    render() {
        if (!this.state.web3) {
            return <div>Loading Web3, accounts, and contract...</div>;
        }

        console.log(this.state)

        return (
            <Container fluid={true}>
                <BrowserRouter>
                    <CustomNavbar/>
                    <Switch>
                        <Route exact path={'/'}>
                            <Home appState={this.state} onNewAuction={this.onNewAuction}/>
                        </Route>
                        <Route path={'/about'}>
                            <About/>
                        </Route>
                    </Switch>
                </BrowserRouter>
                <CustomFooter/>
            </Container>
        );
    }
}


export default App;
