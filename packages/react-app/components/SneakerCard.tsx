import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

type Sneaker = { //Name must match the name in the firestore
  id: string;
  brand: string;
  model: string;
  colorway: string;
  price: number;
  imageUrl: string[];
};

interface ProductCardProps {
  sneaker: Sneaker;
  index: number;
}

const SneakerCard: React.FC<ProductCardProps> = ({ sneaker }) => {
  const router = useRouter();

  const handleViewProduct = (index: string) => {
    router.push(`/product/${index}`);
  };


  const handleBuyNow = (id:string) => {
    if (id && typeof id === 'string') {
      router.push(`/checkout/${id}`);
    }
  };



  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="product-details">
        <p>{sneaker.brand}</p>
        <h1 className='font-extrabold size-5 w-full justify-center'>{sneaker.model}</h1>
        <p>{sneaker.colorway}</p>
        <p>{sneaker.brand}</p>
        <p>Price: ${sneaker.price}</p>
        <Link
            href="#"
            onClick={() => handleBuyNow(sneaker.id)}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Buy Now
          </Link>
      </div>
    </div>
  );
};

export default SneakerCard;