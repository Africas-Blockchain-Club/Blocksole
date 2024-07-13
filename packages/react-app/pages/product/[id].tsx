import React,{ useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {fetchSneakerById} from '../../store/firestoreService';
import SneakerCard from '@/components/SneakerCard';
import Sneaker from '@/types/sneaker';

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



  if (loading) {
    return <div>Loading...</div>;
  }

  if (!sneaker) {
    return <div>Sneaker not found</div>;
  }

  return (
    <div className='pt-4'>
      <SneakerCard sneaker={sneaker} />
    </div>
  );
};

export default ProductPage;