import React from 'react';
import { useRouter } from 'next/router';
// import { useSneakerStore } from '../../store/sneakerStore';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const ProductPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { sneakers } = useSneakerStore(); // replace with where we're getting the sneakers
  const sneaker = sneakers[parseInt(id as string, 10)];

  const handleBuyNow = () => {
    router.push(`/checkout/${id}`);
  };

  if (!sneaker) {
    return <div>Sneaker not found</div>;
  }

  return (
    <div>
      <Header />
      <div className="product-details">
        <h1>{sneaker.name}</h1>
        <p>{sneaker.brand}</p>
        <p>Size: {sneaker.size}</p>
        <p>Quantity: {sneaker.quantity}</p>
        <p>Price: ${sneaker.price}</p>
        <button onClick={handleBuyNow} className="btn">
          Buy Now
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;