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
import {Button, Image, Container, Row, Col, Navbar} from "react-bootstrap";

// React-Router
import {BrowserRouter, Switch, Route, Link} from "react-router-dom"
import CustomFooter from "./components/CustomFooter/CustomFooter";

// Game parameters
const NUMBER_PLAYERS = 5;
const LOUPS_PERCENTAGE = 0.2;
const NR_WOLVES = Math.floor(NUMBER_PLAYERS * LOUPS_PERCENTAGE);

class App extends Component {

    constructor() {
        super();

        let roles = []
        let deads = []

        this.restart_game.bind(this);

        // Randomly initializing player roles
        for(let i = 0; i<NUMBER_PLAYERS; i++){
            roles.push(NR_WOLVES > roles.length)
            deads.push(false)
        }

        this.state = {
            nr_players : NUMBER_PLAYERS,
            roles : shuffle(roles),
            deads: deads
        };
    }

    restart_game(){
        console.log("Reinitializing")
        let roles = []
        let deads = []

        // Randomly initializing player roles
        for(let i = 0; i<NUMBER_PLAYERS; i++){
            roles.push(NR_WOLVES > roles.length)
            deads.push(false)
        }

        this.setState({
            nr_players : NUMBER_PLAYERS,
            roles : shuffle(roles),
            deads: deads
        });
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
      console.log("Rendering APP");
      console.log(this.state);
    return (
        <Container fluid={true}>
          <BrowserRouter>
            <CustomNavbar />

            <Switch>
              <Route exact path={'/'}>
                <Home
                    nr_players={this.state.nr_players}
                    roles={this.state.roles} deads={this.state.deads}
                    on_restart={this.restart_game.bind(this)}/>
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

export default App;
