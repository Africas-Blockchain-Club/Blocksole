import Sneaker from '@/types/sneaker';


const getSneakerImages = (sneaker: Sneaker): string[] => {
  if (!sneaker.imageUrl || !sneaker.imageUrl[0]) return [];

  const sneakerImages = sneaker.imageUrl[0].split("g,http").map((url, index) => {
    return index === 0 ? url : "http" + url;
  });

  return sneakerImages;
};

export default getSneakerImages;