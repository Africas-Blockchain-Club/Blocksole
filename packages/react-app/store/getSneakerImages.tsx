import Sneaker from '@/types/sneaker';
import { useRouter} from 'next/router';



interface ProductCardProps {
    sneaker: Sneaker;
    index: number;
}


const getSneakerImages: React.FC<ProductCardProps> = ({ sneaker }) => {
    const router = useRouter();
  
   
const sneakerImages = sneaker.imageUrl[0].split("png,http")

// Create an empty array to hold the formatted image URLs
const images: string[] = [];

// Iterate through the sneakerImages array and prepend "http" to each URL
for (let i = 0; i < sneakerImages.length; i++) {
  // If it's the first element, don't prepend "http" as it should already be complete
  if (i === 0) {
    images.push(sneakerImages[i]);
  } else {
    images.push("http" + sneakerImages[i]);
  }
  return images}
}
export default getSneakerImages;