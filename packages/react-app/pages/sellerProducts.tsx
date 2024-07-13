import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useRouter } from 'next/router';
import { db } from '../firebaseConfig';
import { collection, addDoc, DocumentReference, doc } from "firebase/firestore"; 


const SellerProductsForm: React.FC = () => {
  const [brand, setBrand] = useState('');//
  const [colorway, setColorway] = useState('');//
  const [imageUrl, setImageUrl] = useState(['']);//
  const [isAvailable, setIsAvailable] = useState(true);//
  const [model, setModel] = useState('');//
  const [price, setPrice] = useState(0);//
  const [seller, setSeller] = useState('/User/So1Hb9gLOJWdEnfxwdZD');
  const [size, setSize] = useState(0);
  const [stockAvailable, setStockAvailable] = useState(0);

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const docRef: DocumentReference = await addDoc(collection(db, "Sneaker"), {
        brand,
        colorway,
        imageUrl,
        isAvailable,
        model,
        price,
        seller,
        size,
        stockAvailable,
      });

      alert("Product added successfully with ID: " + docRef.id);
      
      // Reset form fields
      setBrand('');
      setColorway('');
      setImageUrl(['']);
      setIsAvailable(true);
      setModel('');
      setPrice(0);
      setSize(0);
      setStockAvailable(0);
      
      router.push('/');
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Error adding product");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center dark:text-orange-600">Add Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">Brand</label>
            <input 
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-orange-600" 
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">Colorway</label>
            <input 
              type="text"
              value={colorway}
              onChange={(e) => setColorway(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200" 
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">Image URL</label>
            <input 
              type="text"
              value={imageUrl[0]}
              onChange={(e) => setImageUrl([e.target.value])}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200" 
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">Is Available</label>
            <input 
              type="checkbox"
              checked={isAvailable}
              onChange={(e) => setIsAvailable(e.target.checked)}
              className="form-checkbox" 
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">Model</label>
            <input 
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200" 
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">Price (cUSDT)</label>
            <input 
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200" 
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">Size</label>
            <input 
              type="number"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200" 
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">Stock Available</label>
            <input 
              type="number"
              value={stockAvailable}
              onChange={(e) => setStockAvailable(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200" 
              required
            />
          </div>
          <button type="submit" className="w-full bg-gray-500 text-white py-2 rounded-lg shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default SellerProductsForm;


// import React, { useState } from 'react';
// import { db } from '../firebaseConfig';
// import { collection, addDoc, DocumentReference } from "firebase/firestore"; 

// const SellerProductsForm: React.FC = () => {
//   const [brand, setBrand] = useState('');
//   const [colorway, setColorway] = useState('');
//   const [id, setId] = useState('');
//   const [imageUrl, setImageUrl] = useState(['']);
//   const [isAvailable, setIsAvailable] = useState(true);
//   const [model, setModel] = useState('');
//   const [price, setPrice] = useState(0);
//   const [seller, setSeller] = useState('/User/So1Hb9gLOJWdEnfxwdZD');
//   const [size, setSize] = useState(0);
//   const [stockAvailable, setStockAvailable] = useState(0);

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     try {
//       await addDoc(collection(db, "Sneaker"), {
//         brand,
//         colorway,
//         id,
//         imageUrl,
//         isAvailable,
//         model,
//         price,
//         seller,
//         size,
//         stockAvailable,
//       });
//       alert("Product added successfully!");
//       setBrand('');
//       setColorway('');
//       setId('');
//       setImageUrl(['']);
//       setIsAvailable(true);
//       setModel('');
//       setPrice(0);
//       setSeller('/User/So1Hb9gLOJWdEnfxwdZD');
//       setSize(0);
//       setStockAvailable(0);
//     } catch (e) {
//       console.error("Error adding document: ", e);
//       alert("Error adding product");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">Add Product</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block mb-2 text-sm font-medium text-gray-600">Brand</label>
//             <input 
//               type="text"
//               value={brand}
//               onChange={(e) => setBrand(e.target.value)}
//               className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200" 
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block mb-2 text-sm font-medium text-gray-600">Colorway</label>
//             <input 
//               type="text"
//               value={colorway}
//               onChange={(e) => setColorway(e.target.value)}
//               className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200" 
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block mb-2 text-sm font-medium text-gray-600">ID</label>
//             <input 
//               type="text"
//               value={id}
//               onChange={(e) => setId(e.target.value)}
//               className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200" 
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block mb-2 text-sm font-medium text-gray-600">Image URL</label>
//             <input 
//               type="text"
//               value={imageUrl[0]}
//               onChange={(e) => setImageUrl([e.target.value])}
//               className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200" 
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block mb-2 text-sm font-medium text-gray-600">Is Available</label>
//             <input 
//               type="checkbox"
//               checked={isAvailable}
//               onChange={(e) => setIsAvailable(e.target.checked)}
//               className="form-checkbox" 
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block mb-2 text-sm font-medium text-gray-600">Model</label>
//             <input 
//               type="text"
//               value={model}
//               onChange={(e) => setModel(e.target.value)}
//               className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200" 
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block mb-2 text-sm font-medium text-gray-600">Price</label>
//             <input 
//               type="number"
//               value={price}
//               onChange={(e) => setPrice(Number(e.target.value))}
//               className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200" 
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block mb-2 text-sm font-medium text-gray-600">Size</label>
//             <input 
//               type="number"
//               value={size}
//               onChange={(e) => setSize(Number(e.target.value))}
//               className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200" 
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block mb-2 text-sm font-medium text-gray-600">Stock Available</label>
//             <input 
//               type="number"
//               value={stockAvailable}
//               onChange={(e) => setStockAvailable(Number(e.target.value))}
//               className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200" 
//             />
//           </div>
//           <button type="submit" className="w-full bg-gray-500 text-white py-2 rounded-lg shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
//             Add Product
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default SellerProductsForm;
