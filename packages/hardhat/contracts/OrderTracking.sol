// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract SneakerMarket {
    enum OrderStatus { Placed, Shipped, Completed, Disputed }

    struct Order {
        uint256 orderNumber; // unique order number passed in from front-end
        address buyer; //wallet addres of the buyer     
        uint256 amount; // order amount passed in frontend
        uint256 timestamp; // time  the order was placed
        string status; // status of the order
        string[] sneakerids; // sneaker ids in the order
    }

    uint256[] public orderNumbers; // order numbers of placed orders
    mapping(uint256 => Order) public orders;
    uint256 public orderCount;

    event OrderPlaced(uint256 indexed orderNumber, address indexed buyer, uint256 amount, uint256 timestamp);
    event OrderShipped(uint256 indexed orderNumber);
    event OrderCompleted(uint256 indexed orderNumber);
    event OrderDisputed(uint256 indexed orderNumber);
    event OrderResolved(uint256 indexed orderNumber, string newStatus);


    // function to place order and record it on the chain
    function placeOrder(uint256 _orderNumber, uint256 _amount) public {
        orderCount++;
        require(orders[_orderNumber].orderNumber == 0, "Order number already exists");
        orders[_orderNumber] = Order(_orderNumber,msg.sender, _amount, block.timestamp, getStatusString(OrderStatus.Placed));
        orderNumbers.push(_orderNumber);
        emit OrderPlaced(_orderNumber, msg.sender, _amount, block.timestamp);
    }

    
    // updates status of the order to shipped
    function shipOrder(uint256 _orderNumber) public {
        require(orders[_orderNumber].orderNumber != 0, "Order does not exist");
        orders[_orderNumber].status = getStatusString(OrderStatus.Shipped);
        emit OrderShipped(_orderNumber);
    }

    // updates status of order to completed
    function completeOrder(uint256 _orderNumber) public {
        require(orders[_orderNumber].orderNumber != 0, "Order does not exist");
        require(
        keccak256(abi.encodePacked(orders[_orderNumber].status)) == keccak256(abi.encodePacked(getStatusString(OrderStatus.Shipped))), 
        "Order not yet shipped"
    );        orders[_orderNumber].status = getStatusString(OrderStatus.Completed);
        emit OrderCompleted(_orderNumber);
    }

    // update status of order to disputed 
    function disputeOrder(uint256 _orderNumber) public {
        require(orders[_orderNumber].orderNumber != 0, "Order does not exist");
        orders[_orderNumber].status = getStatusString(OrderStatus.Disputed);
        emit OrderDisputed(_orderNumber);
    }
    // updates disputed status to resolved
    function resolveOrder(uint256 _orderNumber, OrderStatus _newStatus) public {
        require(orders[_orderNumber].orderNumber != 0, "Order does not exist");
        require(
            keccak256(abi.encodePacked(orders[_orderNumber].status)) == keccak256(abi.encodePacked(getStatusString(OrderStatus.Disputed))),
             "Order is not currently disputed"
    );
        orders[_orderNumber].status = getStatusString(_newStatus);
        emit OrderResolved(_orderNumber, getStatusString(_newStatus));
    }



    //retrives the struct of the order requested
    function getOrder(uint256 _orderNumber) public view returns (Order memory) {
        require(orders[_orderNumber].orderNumber != 0, "Order does not exist");
        return orders[_orderNumber];
    }
    

    // retrieves just the status of the order requested
    function getOrderStatus(uint256 _orderNumber) public view returns (string memory) {
        require(orders[_orderNumber].orderNumber != 0, "Order does not exist");
        return orders[_orderNumber].status;
    }


    // retrives all the order with the requested status
    function getOrdersByStatus(OrderStatus _status) public view returns (uint256[] memory) {
        string memory statusString = getStatusString(_status);
        uint256[] memory result = new uint256[](orderCount);
        uint256 counter = 0;

        for (uint256 i = 1; i <= orderCount; i++) {
            if (keccak256(abi.encodePacked(orders[i].status)) == keccak256(abi.encodePacked(statusString))) {
                result[counter] = orders[i].orderNumber;
                counter++;
            }
        }

        uint256[] memory finalResult = new uint256[](counter);
        for (uint256 j = 0; j < counter; j++) {
            finalResult[j] = result[j];
        }

        return finalResult;
    }

    function getStatusString(OrderStatus _status) internal pure returns (string memory) {
        if (_status == OrderStatus.Placed) return "Placed";
        if (_status == OrderStatus.Shipped) return "Shipped";
        if (_status == OrderStatus.Completed) return "Completed";
        if (_status == OrderStatus.Disputed) return "Disputed";
        return "Unknown";
    }


    // returns struct information about all the orders
    function getAllOrders() public view returns (Order[] memory) {
    Order[] memory allOrders = new Order[](orderNumbers.length);
    for (uint256 i = 0; i < orderNumbers.length; i++) {
        allOrders[i] = orders[orderNumbers[i]];
    }
    return allOrders;
    }
}