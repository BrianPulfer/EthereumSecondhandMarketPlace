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
  const [getNumber, setGetNumber] = useState('0x00');
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
  

  return (
    <div className="App">
      <header className="App-header">
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
      </header>
    </div>  
  );
}

export default App;
