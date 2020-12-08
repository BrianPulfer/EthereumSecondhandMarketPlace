import React, { useState } from 'react';
import Web3 from 'web3';
import { simpleStorageAbi } from './abis';
import './App.css';




function App() {
  const web3 = new Web3(Web3.givenProvider);

  // contract address is provided by Truffle migration
  const contractAddr = '0x9af1b6Be409374619146Af6dECcAD802e2704CD5';
  const SimpleContract = new web3.eth.Contract(simpleStorageAbi, contractAddr);

  const handleGet = async (e) => {
    e.preventDefault();
    const result = await SimpleContract.methods.get().call();
    setGetNumber(result);
    console.log(result);
  }
  const handleSet = async (e) => {
    e.preventDefault();    
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    const gas = await SimpleContract.methods.set(number)
                        .estimateGas();
    const result = await SimpleContract.methods.set(number).send({
      from: account,
      gas 
    })
    console.log(result);
  }

  const [number, setNumber] = useState(0);
  const [getNumber, setGetNumber] = useState('0x00');
  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSet}>
          <label>
            Set Number:
            <input 
              type="text"
              name="name"
              value={number}
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
      </header>
    </div>  
);
}



export default App;
