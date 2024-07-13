import React, {useState,useEffect} from 'react';
import { useRouter } from 'next/router';
import { fetchSneakerById } from '@/store/firestoreService';
// import { useSneakerStore } from '../../store/sneakerStore';


type Sneaker = { //Name must match the name in the firestore
  id: string;
  brand: string;
  model: string;
  colorway: string;
  price: number;
  imageUrl: string[];
};


const CheckoutPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
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

  if (!sneaker) {
    return <div>Sneaker not found</div>;
  }

  const handlePayment = () => {
    alert('Proceeding to payment');
    // Implement payment logic here
  };

  return (
    <div>
      <div className="checkout-details">
        <h1>Checkout</h1>
        <p>{sneaker.model}</p>
        <p>{sneaker.brand}</p>
        {/* <p>Size: {sneaker.size}</p> */}
        {/* <p>Quantity: {sneaker.quantity}</p> */}
        <p>Price: ${sneaker.price}</p>
        <button onClick={handlePayment} className="btn">
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;