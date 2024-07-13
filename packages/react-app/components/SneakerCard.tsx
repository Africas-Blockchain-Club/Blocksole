import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Sneaker from '@/types/sneaker';
import getSneakerImages from '@/store/getSneakerImages';

interface ProductCardProps {
  sneaker: Sneaker;
  index: number;
}

const SneakerCard: React.FC<ProductCardProps> = ({ sneaker }) => {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);

  const handleViewProduct = (index: string) => {
    router.push(`/product/${index}`);
  };

  const handleBuyNow = (id: string) => {
    if (id && typeof id === 'string') {
      router.push(`/checkout/${id}`);
    }
  };

  const handleImageSelect = (index: number) => {
    setSelectedImage(index);
  };

  const images = getSneakerImages(sneaker);

  const renderImage = () => {
    return <img src={images[selectedImage]} alt="Selected sneaker" className="w-full" />;
  };

  const renderSelectImage = () => {
    return images.map((image, index) => (
      <div className="m-1 cursor-pointer opacity-90 hover:opacity-75" key={index} onClick={() => handleImageSelect(index)}>
        <a href="#" data-id={index + 1}>
          <img src={image} alt="shoe image" className="w-full" />
        </a>
      </div>
    ));
  };

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          {/* card left */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{sneaker.brand}</h2>
            <h2 className="text-xl text-gray-600">{sneaker.colorway}</h2>

            <div className="relative">
              <div className="overflow-hidden">
                <div className="flex transition-transform duration-500">
                  {renderImage()}
                </div>
              </div>
              {images.length >= 3 && (
                <div className="flex mt-2">
                  {renderSelectImage()}
                </div>
              )}
            </div>
          </div>
          {/* card right */}
          <div className="p-4">
            <div className="mb-4">
              <div className="text-yellow-500">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star-half-alt" />
                <h2 className="text-lg font-semibold">Seller Rating</h2>
                <span className="text-gray-700">4.7 (21)</span>
                <p className="font-black">{images}</p>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-xl font-semibold">
                Price: <span className="text-blue-600">${sneaker.price}</span>
              </p>
            </div>
            <div className="mb-4">
              <p className="text-gray-800">{sneaker.brand}</p>
              <p className="text-gray-600">Add SNEAKER DESCRIPTION TO DATABASE</p>
              <ul className="list-disc pl-5">
                <li>
                  Color: <span className="text-gray-700">{sneaker.colorway}</span>
                </li>
                <li>
                  Available: <span className="text-gray-700">{sneaker.stockAvailable}</span>
                </li>
                <li>
                  Shipping Fee: <span className="text-gray-700">Free</span>
                </li>
              </ul>
            </div>
            <div className="mb-4 flex items-center justify-center">
              {/* <input type="number" min={0} defaultValue={1} className="w-16 border border-gray-300 rounded-lg text-center py-1 mr-2" /> */}
              <input type="number" min={0} defaultValue={1} className='w-10 rounded-full border-full' />
              <button type="button" className="bg-blue-600 text-white rounded-full px-4 py-2 mr-2">
                Add to Cart <i className="fas fa-shopping-cart" />
              </button>
              {/* <button type="button" className="bg-red-600 text-white rounded-full px-4 py-2">
                Compare
              </button> */}
            </div>
            <div className="mb-20 flex items-center justify-center">
              <button type="button" className="w-full sm:w-auto bg-blue-600 text-white rounded-full px-4 py-2 mr-2">
                Buy it now! <i className="fas fa-shopping-cart" />
            </button>
</div>

            
            {/* <div className="flex items-center">
              <p className="mr-2">Share At:</p>
              <a href="#" className="flex items-center justify-center w-8 h-8 text-black border border-black rounded-full mx-1 transition-colors duration-300 hover:bg-black hover:text-white">
                <i className="fab fa-facebook-f" />
              </a>
              <a href="#" className="flex items-center justify-center w-8 h-8 text-black border border-black rounded-full mx-1 transition-colors duration-300 hover:bg-black hover:text-white">
                <i className="fab fa-twitter" />
              </a>
              <a href="#" className="flex items-center justify-center w-8 h-8 text-black border border-black rounded-full mx-1 transition-colors duration-300 hover:bg-black hover:text-white">
                <i className="fab fa-instagram" />
              </a>
              <a href="#" className="flex items-center justify-center w-8 h-8 text-black border border-black rounded-full mx-1 transition-colors duration-300 hover:bg-black hover:text-white">
                <i className="fab fa-whatsapp" />
              </a>
              <a href="#" className="flex items-center justify-center w-8 h-8 text-black border border-black rounded-full mx-1 transition-colors duration-300 hover:bg-black hover:text-white">
                <i className="fab fa-pinterest" />
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default SneakerCard;
