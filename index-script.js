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

var ItemManager
setTimeout(()=>{
    const contractAddr = '0x3338FDF22E26691332322b0E4002869baB583528';
    var ContractClassBox = web3.eth.contract(boxAbi)
    ItemManager = ContractClassBox.at(contractAddr);
    get_contracts()
}, 300)




/* Auction Box */
async function get_contracts(){
    const result = await ItemManager.view_items(function(err, transactionHash) {
        if (!err){
            display_auctions(transactionHash)}})
    
    
    
}
/* Get Title, Description, Image */
async function get_title(Item){
    const result = await Item.get_title();
    return result
}

async function get_description(Item){
    const result = await Item.get_description();
    return result
}

async function get_image(Item){
    const result = await Item.get_image();
    return result
}

/* Get Auctions */
async function display_auctions(articles){
    var i
    for (i = 0; i < articles.length; i++) {
        web3 = new Web3(Web3.givenProvider);
        var contractAddr = articles[articles.length-i-1];
        web3.setProvider(new Web3.providers.HttpProvider("HTTP://127.0.0.1:9545"))
        var ContractClass = web3.eth.contract(contractAbi)
        var Item = ContractClass.at(contractAddr);
        

        var randomizer = i%6 + 1
        var article = document.createElement("article");
        article.className = "style" +randomizer
        var span = document.createElement("article");
        span.className = "image"
        var img = document.createElement("img")
        img.height = 360
        img.width = 360
        img.style.objectFit= "cover"
        img.src = await get_image(Item)

        span.appendChild(img);
        article.appendChild(img)


        var a = document.createElement("a");
        a.href="item.html?address=" +articles[articles.length-i-1]
        var h3 = document.createElement("h3");
        h3.innerText = await get_title(Item)

        h3.style.color = "black"
        h3.style.background = "rgba(255, 255, 255, 0.7)"

        var div = document.createElement("div");
        div.className = "content"

        var p = document.createElement("p");
        p.innerText = await get_description(Item)

        div.appendChild(p)
        a.appendChild(h3).appendChild(div);
        article.appendChild(a);

        document.getElementById('tiles').append(article);
    }
}

