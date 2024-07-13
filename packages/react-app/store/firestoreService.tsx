import { db } from '../firebaseConfig';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import Sneaker from '@/types/sneaker';


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
      imageUrl: data.imageUrl,
      isAvailable: data.isAvailable
    } as Sneaker;
  });
  // Filter out sneakers with invalid image URLs
  const validSneakersList = sneakersList.filter(sneaker => 
    sneaker.imageUrl.every(isValidUrl)
  );
  return validSneakersList;
};

export const fetchSneakerById = async (id: string): Promise<Sneaker | null> => {
  const sneakerDoc = doc(db, 'Sneaker', id);
  const sneakerSnapshot = await getDoc(sneakerDoc);
  
  if (sneakerSnapshot.exists()) {
    const data = sneakerSnapshot.data()!;
    return {
      id: sneakerSnapshot.id,
      brand: data.brand,
      model: data.model,
      colorway: data.colorway,
      price: data.price,
      imageUrl: data.imageUrl
    } as Sneaker;
  }
  
  return null;
};
