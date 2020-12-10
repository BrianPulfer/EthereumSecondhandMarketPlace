// React, Web3 and Ethereum contracts
import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

// Own Components
import Home from "./pages/Home";
import About from "./pages/About";
import CustomNavbar from "./components/CustomNavbar/CustomNavbar";

// Stylesheets
import "./App.css";

// React bootstrap
import {Container} from "react-bootstrap";

// React-Router
import {BrowserRouter, Switch, Route} from "react-router-dom"
import CustomFooter from "./components/CustomFooter/CustomFooter";


class App extends Component {

    constructor() {
        super();

        let itemsTitles = ["Cute doggo"]
        let itemsImages = ["https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*"]
        let itemsDescriptions = ["A very cute doggo"]
        let beneficiaries = ["Mr Beneficiorsky"]
        let highestBids = ["100$"]
        let finishTimes = [1000232325]

        this.state = {
            itemsTitles: itemsTitles,
            itemsImages: itemsImages,
            itemsDescriptions: itemsDescriptions,
            beneficiaries: beneficiaries,
            highestBids: highestBids,
            finishTimes: finishTimes
        };
    }

  //state = { storageValue: 0, web3: null, accounts: null, contract: null };

  /*
  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ storageValue: response });
  };
  */

  render() {
    /*
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    */
    return (
        <Container fluid={true}>
          <BrowserRouter>
            <CustomNavbar />

            <Switch>
              <Route exact path={'/'}>
                <Home appState={this.state}/>
              </Route>
              <Route path={'/about'}>
                <About />
              </Route>
            </Switch>
          </BrowserRouter>

          <CustomFooter/>
        </Container>
    );
  }
}
export default App;
