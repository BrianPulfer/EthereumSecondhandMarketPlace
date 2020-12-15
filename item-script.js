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
var Item
setTimeout(()=>{
    web3 = new Web3(Web3.givenProvider);
    var url_string = window.location.href;
    var url = new URL(url_string);
    var contractAddr = url.searchParams.get("address");
    web3.setProvider(new Web3.providers.HttpProvider("HTTP://127.0.0.1:9545"))
    //const contractAddr = '0xFA372E7d69c556FdA7aa69B574C7F8ec9fEa8f78';
    var ContractClass = web3.eth.contract(contractAbi)
    Item = ContractClass.at(contractAddr);
}, 300)

/* Bidding */
const bid_button = document.getElementById('bid-button');
bid_button.addEventListener('click', bid);
const bid_input = document.getElementById('bid-field');

async function bid() {
    var _value = bid_input.value
    _value = web3.toWei(_value, "ether")
    //let estimatedGas = Item.bid.estimateGas()
    var message = {from: account, value: ''+_value, gas: 100000}
    const result = await Item.bid.sendTransaction(message);
    console.log(result);
    bid_input.value = ''
}

/* Get highest bid */
async function get_highest_bid(){
    const result = await Item.get_highest_bid();
    document.getElementById('highest-bid').innerText = parseFloat(result)/1e18
    return result
}

async function get_leader(){
    const result = await Item.get_leader();
    var element = document.getElementById('highest-bidder')
    if (account == result){
    element.innerText = ''+ result+ " (you)"
    element.style.color = "green"
    
    }
    else{
        element.innerText =  result
        element.style.color = "none"
    }
    
}

/* Get contract balance */
async function get_contract_balance(){
    const result = await Item.get_balance_contract();
    document.getElementById('contract-balance').innerText = parseFloat(result)/1e18
    return result
}

/* Get wallet balance */
async function get_wallet_balance(){
    document.getElementById('wallet-balance').innerText = web3.eth.getBalance(account)
}

/* Get wallet address */
function get_current_address(){
    document.getElementById('wallet-address').innerText = account
    return result
}

/* Get wallet pending returns */
async function get_pending_returns(){
    const result = await Item.get_pending_returns();
    document.getElementById('pending-returns').innerText = parseFloat(result)/1e18
    return result
}

var ongoing = true
async function get_time_left(){
    const result = await Item.get_time();
    function get_remaining_time(timestamp) {
        var difference = timestamp - Date.now()/1000;
        
        return difference;
      }   
      
    var time_difference = get_remaining_time(result)
    var string_time =''+ parseInt((Math.floor(time_difference/60))) + ":" + parseInt((time_difference - (Math.floor(time_difference/60)*60)))
    if (string_time.split(":")[1].length == 1){
      string_time = string_time.split(":")[0]+ ":0" +string_time.split(":")[1]
    }

    if (string_time[0]=="-" && ongoing){

        var red_span = document.createElement("span")
        red_span.style.color = "red"
        red_span.innerText = "ENDED"
        document.getElementById('time-left').innerText = ""
        document.getElementById('time-left').append(red_span)
        ongoing = false
    }
    else if (ongoing){
        document.getElementById('time-left').innerText = string_time
    }

}

const withdraw_button = document.getElementById('withdraw-button');
withdraw_button.addEventListener('click', withdraw);

async function withdraw(){
    const result = await Item.withdraw()
    console.log("You just withdrew "+result +"Wei")
}

/* Get Title, Description, Image */
async function get_title(){
    const result = await Item.get_title();
    document.getElementById('product-title').innerText = result
    return result
}

async function get_description(){
    const result = await Item.get_description();
    document.getElementById('product-description').innerText = result
    return result
}

async function get_image(){
    const result = await Item.get_image();
    document.getElementById('product-image').src = result
    return result
}


/* Update calls */
setInterval(()=>{
    get_highest_bid()
    get_pending_returns()
    get_time_left()
    get_title()
    get_image()
    get_description()
    get_leader()
}, 1000)


