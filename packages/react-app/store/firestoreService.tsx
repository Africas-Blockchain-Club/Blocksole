import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

// Define the Sneaker type
type Sneaker = {
  id: string;
  brand: string;
  model: string;
  colorway: string;
  price: number;
  imageUrl: string[];
};

// Helper function to check if a URL is valid
const isValidUrl = (url: string) => {
  return url.startsWith('http://') || url.startsWith('https://');
};

export const fetchSneakers = async (): Promise<Sneaker[]> => {
  const sneakersCollection = collection(db, 'Sneaker');
  const sneakersSnapshot = await getDocs(sneakersCollection);
  const sneakersList = sneakersSnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      brand: data.brand,
      model: data.model,
      colorway: data.colorway,
      price: data.price,
      imageUrl: data.imageUrl
    } as Sneaker;
  });
  // Filter out sneakers with invalid image URLs
  const validSneakersList = sneakersList.filter(sneaker => 
    sneaker.imageUrl.every(isValidUrl)
  );
  return validSneakersList;
};
