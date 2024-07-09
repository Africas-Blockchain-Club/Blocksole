import { useState } from 'react';

export interface Sneaker {
  name: string;
  brand: string;
  size: string;
  quantity: number;
  price: number;
}

let sneakersState: Sneaker[] = [];

export const useSneakerStore = () => {
  const [sneakers, setSneakers] = useState<Sneaker[]>(sneakersState);

  const addSneaker = (sneaker: Sneaker) => {
    sneakersState = [...sneakersState, sneaker];
    setSneakers(sneakersState);
  };

  return {
    sneakers,
    addSneaker,
  };
};
