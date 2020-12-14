import {contractAbi, boxAbi} from './abis.js';

/* Load web3 */
var web3
var account 
window.addEventListener('load', async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            web3 = window.web3
            const accounts = await window.ethereum.enable();
            account = accounts[0];
            get_current_address()
        } catch (error) {
            // User denied account access...
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
})

/* Load Contract */
var SimpleContract
setTimeout(()=>{
    web3 = new Web3(Web3.givenProvider);
    var url_string = window.location.href;
    var url = new URL(url_string);
    var contractAddr = url.searchParams.get("address");
    web3.setProvider(new Web3.providers.HttpProvider("HTTP://127.0.0.1:9545"))
    //const contractAddr = '0xFA372E7d69c556FdA7aa69B574C7F8ec9fEa8f78';
    var ContractClass = web3.eth.contract(contractAbi)
    SimpleContract = ContractClass.at(contractAddr);
}, 300)

/* Load Contract Box */

var AuctionBox
setTimeout(()=>{
    const contractAddr = '0x3338FDF22E26691332322b0E4002869baB583528';
    var ContractClassBox = web3.eth.contract(boxAbi)
    AuctionBox = ContractClassBox.at(contractAddr);
}, 300)

/* Auction Box */
const create_button = document.getElementById('create-auction-button')
create_button.addEventListener('click', create_contract);

async function create_contract(){
    var bid_length = document.getElementById('bid-length')
    var image_url = document.getElementById('image-url').value
    var product_title = document.getElementById('product-title').value
    var product_description = document.getElementById('product-description').value
    var duration = parseInt(bid_length.value)
    var message = {from: account, gas: 1500000}
    const result = await AuctionBox.createAuction(duration, image_url, product_title, product_description, message)
    console.log(duration, image_url, product_title, product_description, message)
    console.log(result)
}

const check_contracts = document.getElementById('check-contracts')
check_contracts.addEventListener('click', get_contracts);

async function get_contracts(){
    const result = await AuctionBox.returnAllAuctions()
    console.log(result)
}