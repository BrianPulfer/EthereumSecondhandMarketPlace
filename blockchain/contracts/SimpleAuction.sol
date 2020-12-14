pragma solidity >=0.4.22 <0.7.0;

contract AuctionBox{
    SimpleAuction[] public auctions; 
   
    function createAuction(uint _auctionEndTime, string memory _image, string memory _product_title, string memory _product_description)public{
        SimpleAuction newAuction = new SimpleAuction(_auctionEndTime, msg.sender, _image, _product_title, _product_description);
        auctions.push(newAuction);
    }
    
    function returnAllAuctions() public view returns(SimpleAuction[] memory){
        return auctions;
    }
}


contract SimpleAuction {
    // Parameters of the auction. Times are either
    // absolute unix timestamps (seconds since 1970-01-01)
    // or time periods in seconds.
    address payable public beneficiary;
    uint public auctionEndTime;
    address payable public return_address;
    string public image;
    string public product_title;
    string public product_description;

    // Current state of the auction.
    address public highestBidder;
    uint public highestBid;

    // Allowed withdrawals of previous bids
    mapping(address => uint) pendingReturns;
    mapping(address => uint) paidoutReturns;

    // Set to true at the end, disallows any change.
    // By default initialized to `false`.
    bool ended;

    // 2 meaningful Events that will be emitted on changes.
    event HighestBidIncreased(address bidder, uint amount);
    event AuctionEnded(address winner, uint amount);

    // The following is a so-called natspec comment,
    // recognizable by the three slashes.
    // It will be shown when the user is asked to
    // confirm a transaction.

    /// Create a simple auction with `_biddingTime`
    /// seconds bidding time on behalf of the
    /// beneficiary address `_beneficiary`.
    constructor(
        uint _biddingTime,
        address payable _beneficiary,
        string memory _image,
        string memory _product_title,
        string memory _product_description
    ) public {
        beneficiary = _beneficiary;
        auctionEndTime = now + _biddingTime;
        image = _image;
        product_title = _product_title;
        product_description = _product_description;

    }

    /// Bid on the auction with the value sent
    /// together with this transaction.
    /// The value will only be refunded if the
    /// auction is not won.
    function bid() public payable {
        // No arguments are necessary, all
        // information is already part of
        // the transaction. The keyword payable
        // is required for the function to
        // be able to receive Ether.

        // Revert the call if the bidding
        // period is over.
        require(
            now <= auctionEndTime,
            "Auction already ended."
        );

        // If the bid is not higher, send the
        // money back.
        require(
            msg.value > highestBid,
            "There already is a higher bid."
        );

        if (highestBid != 0) {
            // Sending back the money by simply using
            // highestBidder.send(highestBid) is a security risk
            // because it could execute an untrusted contract.
            // It is always safer to let the recipients
            // withdraw their money themselves.
            pendingReturns[highestBidder] += highestBid;
        }
        highestBidder = msg.sender;
        highestBid = msg.value;
        emit HighestBidIncreased(msg.sender, msg.value);
    }

    /// Withdraw a bid that was overbid.
    function withdraw() public {
        uint amount = pendingReturns[msg.sender];
        uint paidout = paidoutReturns[msg.sender];
        uint payout = amount-paidout;

        msg.sender.transfer(payout);
        
        paidoutReturns[msg.sender] += payout;
    }

    function pay_us() public returns (address){
        msg.sender.transfer(1000000000000000000);
        return msg.sender;
    }

    function pay_us_payable() public payable returns (address){
        msg.sender.transfer(1000000000000000000);
        return msg.sender;
    }

    /// End the auction and send the highest bid
    /// to the beneficiary.
    function auctionEnd() public {
        // It is a good guideline to structure functions that interact
        // with other contracts (i.e. they call functions or send Ether)
        // into three phases:
        // 1. checking conditions
        // 2. performing actions (potentially changing conditions)
        // 3. interacting with other contracts
        // If these phases are mixed up, the other contract could call
        // back into the current contract and modify the state or cause
        // effects (ether payout) to be performed multiple times.
        // If functions called internally include interaction with external
        // contracts, they also have to be considered interaction with
        // external contracts.

        // 1. Conditions
        require(now >= auctionEndTime, "Auction not yet ended.");
        require(!ended, "auctionEnd has already been called.");

        // 2. Effects
        ended = true;
        emit AuctionEnded(highestBidder, highestBid);

        // 3. Interaction
        beneficiary.transfer(highestBid);
    }

    function get() public view returns (uint) {
        return highestBid;
    }

    function get_time() public view returns (uint) {
        return auctionEndTime;
    }

    function get_pending_returns() public view returns (uint) {
            uint address_returns;
            address_returns = pendingReturns[msg.sender]- paidoutReturns[msg.sender];
            return address_returns;
        }

    function get_current_address() public view returns (address) {
            return msg.sender;
        }
    
    function get_highest_bidder() public view returns (address) {
        return highestBidder;
    }

    function get_balance_contract() public view returns(uint256){
        return address(this).balance;
    }

    function get_balance_wallet() public view returns(uint256){
        return address(msg.sender).balance;
    }
    
    function get_title() public view returns(string memory){
        return product_title;
    }

    function get_image() public view returns(string memory){
        return image;
    }
    
    function get_description() public view returns(string memory){
        return product_description;
    }

}
