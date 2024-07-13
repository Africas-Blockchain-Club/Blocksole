type Sneaker = { //Name must match the name in the firestore
    id: string;
    brand: string;
    model: string;
    colorway: string;
    price: number;
    imageUrl: string[];
    isAvailable: boolean;
    seller: string;
    size: number,
    stockAvailable: number,
  };

export default Sneaker;