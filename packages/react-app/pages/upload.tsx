// import React, { useState, ChangeEvent, FormEvent } from 'react';
// import { useSneakerStore, Sneaker } from '../store/sneakerStore';

// const Upload: React.FC = () => {
//   const { sneakers, addSneaker } = useSneakerStore();
//   const [currentSneaker, setCurrentSneaker] = useState<Sneaker>({ name: '', brand: '', size: '', quantity: 0, price: 0 });

//   const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     setCurrentSneaker({
//       ...currentSneaker,
//       [name]: name === 'quantity' || name === 'price' ? parseFloat(value) : value,
//     });
//   };

//   const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     addSneaker(currentSneaker);
//     setCurrentSneaker({ name: '', brand: '', size: '', quantity: 0, price: 0 }); // Reset the form
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen py-2">
//       <h1 className="text-3xl font-bold mb-4">Upload Sneakers</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <input
//             type="text"
//             name="name"
//             placeholder="Sneaker Name"
//             value={currentSneaker.name}
//             onChange={handleInputChange}
//             className="input"
//           />
//           <input
//             type="text"
//             name="brand"
//             placeholder="Brand"
//             value={currentSneaker.brand}
//             onChange={handleInputChange}
//             className="input"
//           />
//           <input
//             type="text"
//             name="size"
//             placeholder="Size"
//             value={currentSneaker.size}
//             onChange={handleInputChange}
//             className="input"
//           />
//           <input
//             type="number"
//             name="quantity"
//             placeholder="Quantity"
//             value={currentSneaker.quantity}
//             onChange={handleInputChange}
//             className="input"
//           />
//           <input
//             type="number"
//             name="price"
//             placeholder="Price"
//             value={currentSneaker.price}
//             onChange={handleInputChange}
//             className="input"
//           />
//         </div>
//         <button type="submit" className="btn">
//           Submit
//         </button>
//       </form>
//       <div className="mt-4">
//         <h2 className="text-xl font-bold mb-2">Sneaker List</h2>
//         <ul>
//           {sneakers.map((sneaker, index) => (
//             <li key={index}>
//               {sneaker.name} - {sneaker.brand} - {sneaker.size} - {sneaker.quantity} - ${sneaker.price}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Upload;

