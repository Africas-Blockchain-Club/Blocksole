import React from 'react';
// import { Sneaker } from '../store/firestoreService';
import { useRouter } from 'next/router';

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

const ProductCard: React.FC<ProductCardProps> = ({ sneaker, index }) => {
  const router = useRouter();

  const handleViewProduct = () => {
    router.push(`/product/${index}`);
  };

  return (
    <div className="product-card">
      <h2>{sneaker.brand}</h2>
      <img src={sneaker.imageUrl[0]} alt={sneaker.model} />
      {/* <h2>{sneaker.name}</h2> */}
      {/* <p>Size: {sneaker.size}</p> */}
      {/* <p>Quantity: {sneaker.quantity}</p> */}
      <p>Price: ${sneaker.price}</p>
      <button onClick={handleViewProduct} className="btn">
        View
      </button>
    </div>
  );
};

export default ProductCard;