import React from "react";

const ShoppingCart: React.FC = () => (
  <>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <div className="shopping-cart w-full h-auto mx-auto my-20 bg-white shadow-md rounded-lg flex flex-col p-4 sm:w-[750px] sm:h-[423px] sm:p-0">
      {/* Title */}
      <div className="title h-15 border-b border-gray-200 px-7 py-5 text-gray-700 text-lg font-normal">
        Shopping Bag
      </div>
      {/* Product #1 */}
      <div className="item flex flex-wrap justify-center sm:justify-start px-4 py-5 h-auto sm:h-[120px] border-b border-gray-200">
        <div className="buttons relative pt-7 mr-4 sm:mr-15">
          <span className="delete-btn w-4.5 h-4.25 bg-[url('https://designmodo.com/demo/shopping-cart/delete-icn.svg')] bg-no-repeat bg-center inline-block cursor-pointer" />
          <span className="like-btn absolute top-2.25 left-3.75 bg-[url('https://designmodo.com/demo/shopping-cart/twitter-heart.png')] w-15 h-15 bg-[2900%] bg-no-repeat inline-block cursor-pointer" />
        </div>
        <div className="image mr-4 sm:mr-12.5 w-full sm:w-auto text-center sm:text-left">
          <img className="inline-block w-1/2 sm:w-auto" src="https://designmodo.com/demo/shopping-cart/item-1.png" alt="" />
        </div>
        <div className="description pt-2.5 mr-4 sm:mr-15 w-full sm:w-[115px] sm:min-w-[120px] text-center sm:text-left">
          <span className="block text-sm text-gray-700 font-normal">Common Projects</span>
          <span className="block text-sm text-gray-700 font-normal mb-1.25">Bball High</span>
          <span className="block text-sm text-gray-400 font-light mt-2">White</span>
        </div>
        <div className="quantity pt-5 mr-4 sm:mr-15 w-full sm:w-auto text-center sm:text-left">
          <button className="plus-btn w-7.5 h-7.5 bg-gray-200 rounded-lg border-none cursor-pointer inline-block" type="button" name="button">
            <img className="inline-block mt-0.5" src="https://designmodo.com/demo/shopping-cart/plus.svg" alt="" />
          </button>
          <input className="w-8 text-center text-lg text-gray-700 font-light border-none inline-block" type="text" name="name" defaultValue={1} />
          <button className="minus-btn w-7.5 h-7.5 bg-gray-200 rounded-lg border-none cursor-pointer inline-block" type="button" name="button">
            <img className="inline-block mb-0.75" src="https://designmodo.com/demo/shopping-cart/minus.svg" alt="" />
          </button>
        </div>
        <div className="total-price w-full sm:w-[83px] pt-6.75 text-center sm:text-left text-lg text-gray-700 font-light">$549</div>
      </div>
      {/* Product #2 */}
      <div className="item flex flex-wrap justify-center sm:justify-start px-4 py-5 h-auto sm:h-[120px] border-b border-gray-200">
        <div className="buttons relative pt-7 mr-4 sm:mr-15">
          <span className="delete-btn w-4.5 h-4.25 bg-[url('https://designmodo.com/demo/shopping-cart/delete-icn.svg')] bg-no-repeat bg-center inline-block cursor-pointer" />
          <span className="like-btn absolute top-2.25 left-3.75 bg-[url('https://designmodo.com/demo/shopping-cart/twitter-heart.png')] w-15 h-15 bg-[2900%] bg-no-repeat inline-block cursor-pointer" />
        </div>
        <div className="image mr-4 sm:mr-12.5 w-full sm:w-auto text-center sm:text-left">
          <img className="inline-block w-1/2 sm:w-auto" src="https://designmodo.com/demo/shopping-cart/item-2.png" alt="" />
        </div>
        <div className="description pt-2.5 mr-4 sm:mr-15 w-full sm:w-[115px] sm:min-w-[120px] text-center sm:text-left">
          <span className="block text-sm text-gray-700 font-normal">Maison Margiela</span>
          <span className="block text-sm text-gray-700 font-normal mb-1.25">Future Sneakers</span>
          <span className="block text-sm text-gray-400 font-light mt-2">White</span>
        </div>
        <div className="quantity pt-5 mr-4 sm:mr-15 w-full sm:w-auto text-center sm:text-left">
          <button className="plus-btn w-7.5 h-7.5 bg-gray-200 rounded-lg border-none cursor-pointer inline-block" type="button" name="button">
            <img className="inline-block mt-0.5" src="https://designmodo.com/demo/shopping-cart/plus.svg" alt="" />
          </button>
          <input className="w-8 text-center text-lg text-gray-700 font-light border-none inline-block" type="text" name="name" defaultValue={1} />
          <button className="minus-btn w-7.5 h-7.5 bg-gray-200 rounded-lg border-none cursor-pointer inline-block" type="button" name="button">
            <img className="inline-block mb-0.75" src="https://designmodo.com/demo/shopping-cart/minus.svg" alt="" />
          </button>
        </div>
        <div className="total-price w-full sm:w-[83px] pt-6.75 text-center sm:text-left text-lg text-gray-700 font-light">$870</div>
      </div>
      {/* Product #3 */}
      <div className="item flex flex-wrap justify-center sm:justify-start px-4 py-5 h-auto sm:h-[120px] border-b border-gray-200">
        <div className="buttons relative pt-7 mr-4 sm:mr-15">
          <span className="delete-btn w-4.5 h-4.25 bg-[url('https://designmodo.com/demo/shopping-cart/delete-icn.svg')] bg-no-repeat bg-center inline-block cursor-pointer" />
          <span className="like-btn absolute top-2.25 left-3.75 bg-[url('https://designmodo.com/demo/shopping-cart/twitter-heart.png')] w-15 h-15 bg-[2900%] bg-no-repeat inline-block cursor-pointer" />
        </div>
        <div className="image mr-4 sm:mr-12.5 w-full sm:w-auto text-center sm:text-left">
          <img className="inline-block w-1/2 sm:w-auto" src="https://designmodo.com/demo/shopping-cart/item-3.png" alt="" />
        </div>
        <div className="description pt-2.5 mr-4 sm:mr-15 w-full sm:w-[115px] sm:min-w-[120px] text-center sm:text-left">
          <span className="block text-sm text-gray-700 font-normal">Our Legacy</span>
          <span className="block text-sm text-gray-700 font-normal mb-1.25">Brushed Scarf</span>
          <span className="block text-sm text-gray-400 font-light mt-2">Brown</span>
        </div>
        <div className="quantity pt-5 mr-4 sm:mr-15 w-full sm:w-auto text-center sm:text-left">
          <button className="plus-btn w-7.5 h-7.5 bg-gray-200 rounded-lg border-none cursor-pointer inline-block" type="button" name="button">
            <img className="inline-block mt-0.5" src="https://designmodo.com/demo/shopping-cart/plus.svg" alt="" />
          </button>
          <input className="w-8 text-center text-lg text-gray-700 font-light border-none inline-block" type="text" name="name" defaultValue={1} />
          <button className="minus-btn w-7.5 h-7.5 bg-gray-200 rounded-lg border-none cursor-pointer inline-block" type="button" name="button">
            <img className="inline-block mb-0.75" src="https://designmodo.com/demo/shopping-cart/minus.svg" alt="" />
          </button>
        </div>
        <div className="total-price w-full sm:w-[83px] pt-6.75 text-center sm:text-left text-lg text-gray-700 font-light">$349</div>
      </div>
    </div>
  </>
);

export default ShoppingCart;
