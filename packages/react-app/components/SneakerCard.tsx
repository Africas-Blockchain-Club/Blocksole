import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useCart } from '@/types/cartContext';
import Sneaker from '@/types/sneaker';
import getSneakerImages from '@/store/getSneakerImages';

interface ProductCardProps {
  sneaker: Sneaker;
}

const SneakerCard: React.FC<ProductCardProps> = ({ sneaker }) => {
  const router = useRouter();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);

  const handleViewProduct = (index: string) => {
    router.push(`/product/${index}`);
  };

  const handleBuyNow = () => {
    router.push(`/checkout/${sneaker.id}`);
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

  const handleAddToCart = () => {
    addToCart(sneaker);
  };

  return (
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
            <p className="text-xl font-semibold">
              Price: <span className="text-orange-600">${sneaker.price}</span>
            </p>
          </div>
          <div className="mb-4 flex items-center justify-center">
            <input type="number" min={0} defaultValue={1} className="w-16 border border-gray-300 rounded-lg text-center py-1 mr-2" />
            <button type="button" className="bg-orange-600 hover:bg-orange-700 text-white rounded-full px-4 py-2 mr-2" onClick={handleAddToCart}>
              Add to Cart <i className="fas fa-shopping-cart" />
            </button>
            
          </div>
          <div className="mb-4 flex items-center justify-center">
          <button type="button" className="bg-orange-600 hover:bg-orange-700 text-white rounded-full px-4 py-2" onClick={handleBuyNow}>
              Buy Now! <i className="fas fa-shopping-cart" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SneakerCard;

