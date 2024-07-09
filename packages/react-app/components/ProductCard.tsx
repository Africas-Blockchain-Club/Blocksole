import React from 'react';
import { Sneaker } from '../store/sneakerStore';
import { useRouter } from 'next/router';

interface ProductCardProps {
  sneaker: Sneaker;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ sneaker, index }) => {
  const router = useRouter();

  const handleViewProduct = () => {
    router.push(`/product/${index}`);
  };

  return (
    <div className="product-card">
      <h2>{sneaker.name}</h2>
      <p>{sneaker.brand}</p>
      <p>Size: {sneaker.size}</p>
      <p>Quantity: {sneaker.quantity}</p>
      <p>Price: ${sneaker.price}</p>
      <button onClick={handleViewProduct} className="btn">
        View
      </button>
    </div>
  );
};

export default ProductCard;