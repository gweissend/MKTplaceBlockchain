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
        address owner;
        bool purchased;
    }

    event ProductCreated(
        uint id,
        string name,
        uint price, 
        address owner,
        bool purchased
    );

    constructor() public {
        name = "Grey's Marketplace";
    }

    function createProduct(string memory _name, uint _price) public {
        productCount ++;
        // Make sure parameters are correct
        // Create the product
        products[productCount] = Product(productCount, _name, _price, msg.sender, false);
        // trigger an event
        emit ProductCreated(productCount, _name, _price, msg.sender, false);
    }
}

//struct allows you to create your own data structures//