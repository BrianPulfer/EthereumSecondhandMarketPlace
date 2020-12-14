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

/* Load Contract Box */

var AuctionBox
setTimeout(()=>{
    const contractAddr = '0x3338FDF22E26691332322b0E4002869baB583528';
    var ContractClassBox = web3.eth.contract(boxAbi)
    AuctionBox = ContractClassBox.at(contractAddr);
    get_contracts()
}, 300)




/* Auction Box */
async function get_contracts(){
    const result = await AuctionBox.returnAllAuctions(function(err, transactionHash) {
        if (!err){
            display_auctions(transactionHash)}})
    
    
    
}
/* Get Title, Description, Image */
async function get_title(SimpleContract){
    const result = await SimpleContract.get_title();
    return result
}

async function get_description(SimpleContract){
    const result = await SimpleContract.get_description();
    return result
}

async function get_image(SimpleContract){
    const result = await SimpleContract.get_image();
    return result
}

/* Get Auctions */
async function display_auctions(articles){
    var i
    for (i = 0; i < articles.length; i++) {
        web3 = new Web3(Web3.givenProvider);
        var contractAddr = articles[i];
        web3.setProvider(new Web3.providers.HttpProvider("HTTP://127.0.0.1:9545"))
        var ContractClass = web3.eth.contract(contractAbi)
        var SimpleContract = ContractClass.at(contractAddr);
        

        var randomizer = i%6 + 1
        var article = document.createElement("article");
        article.className = "style" +randomizer
        var span = document.createElement("article");
        span.className = "image"
        var img = document.createElement("img")
        img.height = 353
        img.width = 326
        img.src = await get_image(SimpleContract)
        span.appendChild(img);
        article.appendChild(img)


        var a = document.createElement("a");
        a.href="item.html?address=" +articles[i]
        var h2 = document.createElement("h2");
        h2.innerText = await get_title(SimpleContract)

        var div = document.createElement("div");
        div.className = "content"

        var p = document.createElement("p");
        p.innerText = await get_description(SimpleContract)

        div.appendChild(p)
        a.appendChild(h2).appendChild(div);
        article.appendChild(a);

        document.getElementById('tiles').append(article);
    }
}
