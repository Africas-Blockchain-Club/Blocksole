import React,{ useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// import { useSneakerStore } from '../../store/sneakerStore';
import {fetchSneakerById, fetchSneakers} from '../../store/firestoreService';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
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
  const [sneaker, setSneaker] = useState<Sneaker | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSneakerData = async () => {
      if (id && typeof id === 'string') {
        const sneakerData = await fetchSneakerById(id);
        setSneaker(sneakerData);
        setLoading(false);
      }
    };

    fetchSneakerData();
  }, [id]);

  const handleBuyNow = () => {
    if (id && typeof id === 'string') {
      router.push(`/checkout/${id}`);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!sneaker) {
    return <div>Sneaker not found</div>;
  }

  return (
    <div>
      <div className="product-details">
      <ProductCard index={0} sneaker={sneaker} />
        <h1>{sneaker.model}</h1>
        <p>{sneaker.brand}</p>
        <p>Price: ${sneaker.price}</p>
        <button onClick={handleBuyNow} className="btn">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductPage;