import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { useSneakerStore } from '../store/sneakerStore';

const Home: React.FC = () => {
  const { sneakers } = useSneakerStore();

  return (
    <div>
      <Head>
        <title>Sneaker Marketplace</title>
        <meta name="description" content="Decentralized Sneaker Marketplace" />
      </Head>


      <div className="products-container">
        {sneakers.length > 0 ? (
          sneakers.map((sneaker, index) => (
            <ProductCard key={index} index={index} sneaker={sneaker} />
          ))
        ) : (
          <div className="flex items-center justify-center h-64">
            <p className="text-xl font-semibold text-gray-500">No sneakers to show yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;




