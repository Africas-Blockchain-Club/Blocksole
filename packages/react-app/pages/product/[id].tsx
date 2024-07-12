import React from 'react';
import { useRouter } from 'next/router';
// import { useSneakerStore } from '../../store/sneakerStore';
import {fetchSneakers} from '../../store/firestoreService';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useState, useEffect } from 'react';
import ProductCard from "../../components/ProductCard"


type Sneaker = { //Name must match the name in the firestore
  id: string;
  brand: string;
  model: string;
  colorway: string;
  price: number;
  imageUrl: string[];
};

const ProductPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  // const { sneakers } = fetchSneakers; // replace with where we're getting the sneakers from
  const [sneakers, setSneakers] = useState<Sneaker[]>([]);
  useEffect(() => {
    const fetchSneakersData = async () => {
      const sneakersList = await fetchSneakers();
      setSneakers(sneakersList);
    };

    fetchSneakersData();
  }, []);

  const sneaker = sneakers[parseInt(id as string, 10)];

  const handleBuyNow = () => {
    router.push(`/checkout/${id}`);
  };

  if (!sneaker) {
    return <div>Sneaker not found</div>;
  }

  return (
    <div>
      <ProductCard index={0} sneaker={sneaker} />

      <Header /> 
      <div className="product-details">
        <h1>{sneaker.model}</h1>
        <p>{sneaker.brand}</p>
        {/* {/* <p>Size: {sneaker.size}</p> */}
        {/*<p>Quantity: {sneaker.quantity}</p> */}
        <p>Price: ${sneaker.price}</p>
        <button onClick={handleBuyNow} className="btn">
          Buy Now
        </button>
      </div>
      /* <Footer />
    </div>
  );
};

export default ProductPage;