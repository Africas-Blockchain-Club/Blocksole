import React from 'react';
import { useRouter } from 'next/router';
// import { useSneakerStore } from '../../store/sneakerStore';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const CheckoutPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { sneakers } = useSneakerStore(); // replace with where we're getting the sneakers
  const sneaker = sneakers[parseInt(id as string, 10)];

  if (!sneaker) {
    return <div>Sneaker not found</div>;
  }

  const handlePayment = () => {
    alert('Proceeding to payment');
    // Implement payment logic here
  };

  return (
    <div>
      <Header />
      <div className="checkout-details">
        <h1>Checkout</h1>
        <p>{sneaker.name}</p>
        <p>{sneaker.brand}</p>
        <p>Size: {sneaker.size}</p>
        <p>Quantity: {sneaker.quantity}</p>
        <p>Price: ${sneaker.price}</p>
        <button onClick={handlePayment} className="btn">
          Proceed to Payment
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;