pragma solidity ^0.5.0;

//state variable writes information to the blockchain//

contract Marketplace {
    string public name;
    uint public productCount = 0; 
    mapping(uint => Product) public products;

    struct Product {
        uint id;
        string name;
        uint price; 
        address payable owner;
        bool purchased;
    }

    event ProductCreated(
        uint id,
        string name,
        uint price, 
        address payable owner,
        bool purchased
    );

     event ProductPurchased(
        uint id,
        string name,
        uint price, 
        address payable owner,
        bool purchased
    );

    constructor() public {
        name = "Grey's Marketplace";
    }

    function createProduct(string memory _name, uint _price) public {
        productCount ++;
        //require a valid name
        require(bytes(_name).length > 0);
        //require price greater than 0
        require(_price > 0);
        // Create the product
        products[productCount] = Product(productCount, _name, _price, msg.sender, false);
        // trigger an event
        emit ProductCreated(productCount, _name, _price, msg.sender, false);
    }

    function purchaseProduct(uint _id) public payable {
        //Fetch product
        Product memory _product = products[_id];
        //Fetch owner
        address payable _seller = _product.owner;
        //Make sure product is valid

        //Purchase product
        _product.owner = msg.sender;
        //Change  purchased status
        _product.purchased = true;
        //Update product
        products[_id] = _product;
        //also need to pay the selle by sending Ether
        address(_seller).transfer(msg.value);
        //Trigger event
        emit ProductPurchased(productCount, _product.name, _product.price, msg.sender, false);
    }

}

//struct allows you to create your own data structures//