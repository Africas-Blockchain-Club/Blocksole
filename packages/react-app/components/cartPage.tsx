import React from 'react';
import { useCart } from '@/types/cartContext';
import { placeOrder } from '@/services/OrderCompletionService';

const ShoppingCart: React.FC = () => {
  const { cart } = useCart();

  const handleProceedToCheckout = async () => {
    const orderNumber = 12345; // Will get order number from firebase
    const amount = calculateTotalPrice() + calculateShippingCosts(); // Adjust if needed based on your logic
    const sneakerIds = cart.map(item => item.sneaker.id);

    const orderPlaced = await placeOrder(orderNumber, amount, sneakerIds);

    if (orderPlaced) {
      // Handle successful order placement, e.g., show confirmation or redirect
      console.log("Order placed successfully!");
      alert("Order placed successfully!");
    } else {
      // Handle failure case
      alert("Failed to place the order.");
      console.error("Failed to place the order.");
    }
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.sneaker.price * item.quantity, 0);
  };

  const calculateShippingCosts = () => {
    const totalPrice = calculateTotalPrice();
    if (totalPrice > 1000) {
      return 0;
    } else if (totalPrice > 500) {
      return 10;
    } else {
      return 20;
    }
  };

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Shopping Cart</title>
      <div className="shopping-cart w-full h-auto mx-auto my-20 bg-white shadow-md rounded-lg flex flex-col p-4 sm:w-[750px] sm:h-[423px] sm:p-0">
        <div className="title h-15 border-b border-gray-200 px-7 py-5 text-gray-700 text-lg font-normal">
          Shopping Bag
        </div>
        {cart.map((item, index) => (
          <div className="item flex flex-wrap justify-center sm:justify-start px-4 py-5 h-auto sm:h-[120px] border-b border-gray-200" key={index}>
            <div className="buttons relative pt-7 mr-4 sm:mr-15">
              <span className="delete-btn w-4.5 h-4.25 bg-[url('https://designmodo.com/demo/shopping-cart/delete-icn.svg')] bg-no-repeat bg-center inline-block cursor-pointer" />
              <span className="like-btn absolute top-2.25 left-3.75 bg-[url('https://designmodo.com/demo/shopping-cart/twitter-heart.png')] w-15 h-15 bg-[2900%] bg-no-repeat inline-block cursor-pointer" />
            </div>
            <div className="image mr-4 sm:mr-12.5 w-full sm:w-auto text-center sm:text-left">
              <img className="inline-block w-1/2 sm:w-auto" src={item.sneaker.imageUrl[0]} alt="" />
            </div>
            <div className="description pt-2.5 mr-4 sm:mr-15 w-full sm:w-[115px] sm:min-w-[120px] text-center sm:text-left">
              <span className="block text-sm text-gray-700 font-normal">{item.sneaker.brand}</span>
              <span className="block text-sm text-gray-700 font-normal mb-1.25">{item.sneaker.colorway}</span>
            </div>
            <div className="quantity pt-5 mr-4 sm:mr-15 w-full sm:w-auto text-center sm:text-left">
              <button className="plus-btn w-7.5 h-7.5 bg-gray-200 rounded-lg border-none cursor-pointer inline-block" type="button" name="button">
                <img className="inline-block mt-0.5" src="https://designmodo.com/demo/shopping-cart/plus.svg" alt="" />
              </button>
              <input className="w-8 text-center text-lg text-gray-700 font-light border-none inline-block" type="text" name="name" value={item.quantity} readOnly />
              <button className="minus-btn w-7.5 h-7.5 bg-gray-200 rounded-lg border-none cursor-pointer inline-block" type="button" name="button">
                <img className="inline-block mb-0.75" src="https://designmodo.com/demo/shopping-cart/minus.svg" alt="" />
              </button>
            </div>
            <div className="total-price w-full sm:w-[83px] pt-6.75 text-center sm:text-left text-lg text-gray-700 font-light">${item.sneaker.price * item.quantity}</div>
          </div>
        ))}
        <div className="flex justify-between items-center px-7 py-5">
          <div className="text-lg text-gray-700 font-semibold">Total Price:</div>
          <div className="text-lg text-gray-700 font-semibold">${calculateTotalPrice()}</div>
        </div>
        <div className="flex justify-between items-center px-7 py-5">
          <div className="text-lg text-gray-700 font-semibold">Shipping Costs:</div>
          <div className="text-lg text-gray-700 font-semibold">${calculateShippingCosts()}</div>
        </div>
        {/* Checkout Button */}
        <div className="px-7 py-5">
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          onClick={handleProceedToCheckout}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;

