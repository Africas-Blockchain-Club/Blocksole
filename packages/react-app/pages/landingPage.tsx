import Head from 'next/head';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Sneaker Marketplace</title>
        <meta name="description" content="Decentralized Sneaker Marketplace" />
      </Head>

      

      <Hero />
      {/* Add more sections as needed */}
     </div>
  );
};

export default Home;

