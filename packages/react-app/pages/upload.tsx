import { useState, ChangeEvent, FormEvent } from 'react';

interface Sneaker {
  name: string;
  brand: string;
  size: string;
  quantity: number;
  price: number;
}

const Upload: React.FC = () => {
  const [sneakers, setSneakers] = useState<Sneaker[]>([
    { name: '', brand: '', size: '', quantity: 0, price: 0 },
  ]);

  const handleInputChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSneakers((prevSneakers) => {
      const newSneakers = [...prevSneakers];
      newSneakers[index] = {
        ...newSneakers[index],
        [name]: name === 'quantity' || name === 'price' ? parseFloat(value) : value,
      } as Sneaker;
      return newSneakers;
    });
  };

  const handleAddSneaker = () => {
    setSneakers([
      ...sneakers,
      { name: '', brand: '', size: '', quantity: 0, price: 0 },
    ]);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Submit sneakers to the backend
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold mb-4">Upload Sneakers</h1>
      <form onSubmit={handleSubmit}>
        {sneakers.map((sneaker, index) => (
          <div key={index} className="mb-4">
            <input
              type="text"
              name="name"
              placeholder="Sneaker Name"
              value={sneaker.name}
              onChange={(event) => handleInputChange(index, event)}
              className="input"
            />
            <input
              type="text"
              name="brand"
              placeholder="Brand"
              value={sneaker.brand}
              onChange={(event) => handleInputChange(index, event)}
              className="input"
            />
            <input
              type="text"
              name="size"
              placeholder="Size"
              value={sneaker.size}
              onChange={(event) => handleInputChange(index, event)}
              className="input"
            />
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={sneaker.quantity}
              onChange={(event) => handleInputChange(index, event)}
              className="input"
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={sneaker.price}
              onChange={(event) => handleInputChange(index, event)}
              className="input"
            />
          </div>
        ))}
        <button type="button" onClick={handleAddSneaker} className="btn">
          Add Another Sneaker
        </button>
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Upload;
