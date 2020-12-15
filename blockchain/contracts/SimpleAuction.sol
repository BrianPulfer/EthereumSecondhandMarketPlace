pragma solidity >=0.4.22 <0.7.0;

contract ItemManager{
    Item[] public items; 
   
    function putItemForSale(uint _duration, string memory _image, string memory _product_title, string memory _product_description)public{
        Item item = new Item(_duration, msg.sender, _image, _product_title, _product_description);
        items.push(item);
    }
    
    function returnAllAuctions() public view returns(Item[] memory){
        return items;
    }
}


contract Item {
    /* Constructor parameters */
    address payable public seller;
    uint public duration;
    string public image;
    string public product_title;
    string public product_description;

    /* Leader Parameters */
    address public leader;
    uint public highest_bid;

    /* Withdraws */
    address payable public return_address;
    mapping(address => uint) pending_returns;
    mapping(address => uint) paidout_returns;

    /* Checking if auction has been called already */

    bool ongoing;

    /* Event Messages */
    event bid_increased(address leader, uint new_highest_bid);
    event sale_completed(address winner, uint new_highest_bid);

    constructor(
        uint _biddingTime,
        address payable _seller,
        string memory _image,
        string memory _product_title,
        string memory _product_description
    ) public {
        seller = _seller;
        duration = now + _biddingTime;
        image = _image;
        product_title = _product_title;
        product_description = _product_description;
    }

    function bid() public payable {
        require(now < duration);

        require(msg.value > highest_bid + 5000000000000000,
            "Proposed bid needs to be higher than current bid by 0.005 ETH at least"
        );

        if (highest_bid != 0) {
            pending_returns[leader] += highest_bid;
        }
        leader = msg.sender;
        highest_bid = msg.value;
        
        /* if (duration-now < 180) {
           duration = now + 180;
        } */
        emit bid_increased(msg.sender, msg.value);
    }

    function withdraw() public {
        uint amount = pending_returns[msg.sender];
        uint paidout = paidout_returns[msg.sender];
        uint payout = amount-paidout;

        msg.sender.transfer(payout);        
        paidout_returns[msg.sender] += payout;
    }

    function complete_sale() public {
        require(now > duration, "Too soon to call. Item is still up for sale");
        require(ongoing, "The item sale has been called already");

        ongoing = false;
        seller.transfer(highest_bid);

        emit sale_completed(leader, highest_bid);
    }


    //View functions
    function get_highest_bid() public view returns (uint) {
        return highest_bid;
    }

    function get_time() public view returns (uint) {
        return duration;
    }

    function get_pending_returns() public view returns (uint) {
            uint address_returns;
            address_returns = pending_returns[msg.sender]- paidout_returns[msg.sender];
            return address_returns;
        }

    function get_current_address() public view returns (address) {
            return msg.sender;
        }
    
    function get_leader() public view returns (address) {
        return leader;
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
