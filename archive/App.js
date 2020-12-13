import React, { useState } from 'react';
import SimpleAuctionContract from "./build/contracts/SimpleAuction.json";
import getWeb3 from "./getWeb3";
import './App.css';

function App() {
  static async function getWeb3(){
  const web3 = await getWeb3();
  return web3}
  const web3 = getWeb3()

  static async function getContract(){
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = SimpleAuctionContract.networks[networkId];
  SimpleContract = new web3.eth.Contract(
            SimpleAuctionContract.abi,
            deployedNetwork && deployedNetwork.address,
        );
  return SimpleContract
      }

  const SimpleContract = getContract() 
  
  //const web3 = new Web3(Web3.givenProvider);
  //const contractAddr = '0x9af1b6Be409374619146Af6dECcAD802e2704CD5';
  //const SimpleContract = new web3.eth.Contract(simpleStorageAbi, contractAddr);

  //React management
  var [_value, setNumber] = useState(0);
  var [getNumber, setGetNumber] = useState('0x00');

  var [time_left, getTimeNumber] = useState('0x00');
  var [balance_contract, getContractBalance] = useState('0x00');


  const handleBid = async (e) => {
    e.preventDefault();    
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    
/*     const result = await SimpleContract.methods.bid().send({
      from: account,
      value: web3.toWei(1000011000, "ether"),
      gas: 1000011100
    }) */
    _value = web3.utils.toWei(''+_value, "ether")
    var message = {
      from: account,
      value: _value,
      gas: 100000
    }
    const gas = await SimpleContract.methods.bid().estimateGas(message);
    message = {
      from: account,
      value: _value,
      gas: gas
    }

    const result = await SimpleContract.methods.bid().send(message)
    console.log(result);
  }


  async function handleGet (){
    const result = await SimpleContract.methods.get().call();
    setGetNumber(result);
  }

  async function handleBalance(){
    const result = await SimpleContract.methods.balance_contract().call();
    getContractBalance(result)
  }

  const handleWithdraw = async (e) => {
    e.preventDefault();
    const result = await SimpleContract.methods.withdraw().call();
    console.log(result);
  }
  const handleWithdrawDisplay = async (e) => {
    e.preventDefault();
    const result = await SimpleContract.methods.get_returns().call();
    console.log(result);
  }

  const handleAddressDisplay = async (e) => {
    e.preventDefault();
    const result = await SimpleContract.methods.get_current_address().call();
    console.log(result);
  }

  const handleHighestBidder = async (e) => {
    e.preventDefault();
    const result = await SimpleContract.methods.get_highest_bidder().call();
    console.log(result);
  }

  async function handlePayUs (){
    const result = await SimpleContract.methods.pay_us().call();
    console.log(result);
  }
  
  async function handlePayUsPayable(){
    const accounts = await window.ethereum.enable();
    const account = accounts[0];

    var message = {
      from: account,
      value: '1',
      gas: 100000
    }
    const result = await SimpleContract.methods.pay_us_payable().send(message);
    console.log(result);
  }

  async function handleEndContract(){
    const result = await SimpleContract.methods.auctionEnd().call();
    console.log(result);
  }


/* Time Management */

async function handleTime(){
  const result = await SimpleContract.methods.get_time().call()
  //why does it call result so many times?

  setTimeout(()=>{
    handleGet()
    handleBalance()
    var time_difference = get_remaining_time(result)
    var string_time =''+ parseInt((Math.floor(time_difference/60))) + ":" + parseInt((time_difference - (Math.floor(time_difference/60)*60)))
    if (string_time.split(":")[1].length == 1){
      string_time = string_time.split(":")[0]+ ":0" +string_time.split(":")[1]
    }
    
    getTimeNumber(string_time)
  }, 1000)
}

handleTime()

function get_remaining_time(timestamp) {
  var difference = timestamp - Date.now()/1000;
  return difference;
}

  return (
    <div className="App">
      <header className="App-header">
        <h1>Product Title</h1>
        <form onSubmit={handleBid}>
          <label>
            Set Number:
            <input 
              type="text"
              name="name"
              value={_value}
              onChange={ e => setNumber(e.target.value) } />
          </label>
          <input type="submit" value="Set Number" />
        </form>
        <br/>

        <h1>Bid Price: {getNumber/1000000000}</h1>
        
        <br/>
        <button
          onClick={handleWithdraw}
          type="button" > 
          Withdraw
        </button>
        <button
          onClick={handleWithdrawDisplay}
          type="button" > 
          Display Withdraw amount
        </button>

        <button
          onClick={handleAddressDisplay}
          type="button" > 
          sender address
        </button>

        <button
          onClick={handleHighestBidder}
          type="button" > 
          Highest Bidder
        </button>

        <button
          onClick={handlePayUs}
          type="button" > 
          Pay Us
        </button>

        <button
          onClick={handlePayUsPayable}
          type="button" > 
          Pay Us Payable
        </button>
        <button
          onClick={handleEndContract}
          type="button" > 
          End Contract
        </button>

        <div>
          
          <h1 id="time_left">Time Left: {time_left}</h1>
          <h1 id="time_left">Contract Balance: {balance_contract}</h1>
        </div>
      </header>
    </div>  
  );
}




export default App;
