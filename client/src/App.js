import React, { useState } from 'react';
import Web3 from 'web3';
import { simpleStorageAbi } from './abis';
import './App.css';

function App() {
  const web3 = new Web3(Web3.givenProvider);
  
  const contractAddr = '0x9af1b6Be409374619146Af6dECcAD802e2704CD5';
  const SimpleContract = new web3.eth.Contract(simpleStorageAbi, contractAddr);

  //React management
  var [_value, setNumber] = useState(0);
  var [getNumber, setGetNumber] = useState('0x00');

  var [time_left, getTimeNumber] = useState('0x00');


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


  const handleGet = async (e) => {
    e.preventDefault();
    const result = await SimpleContract.methods.get().call();
    setGetNumber(result);
    console.log(result);
  }

  const handleWithdraw = async (e) => {
    e.preventDefault();
    const result = await SimpleContract.methods.get_returns.call();
    console.log(result);
  }

/* Time Management */

async function handleTime(){
  const result = await SimpleContract.methods.get_time().call()
  //why does it call result so many times?


  setInterval(()=>{
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
        <button
          onClick={handleGet}
          type="button" > 
          Get Number 
        </button>
        { getNumber }
        <br/>
        <button
          onClick={handleWithdraw}
          type="button" > 
          Withdraw
        </button>
        <div>
          
          <h1 id="time_left">Time Left: {time_left}</h1>
        </div>
      </header>
    </div>  
  );
}




export default App;
