// /services/SellerProductsForm.tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { db } from '../firebaseConfig';
import { collection, addDoc, DocumentReference } from "firebase/firestore"; 
import { listSneaker } from '@/services/listSneaker';
import { useAccount } from 'wagmi';

const SellerProductsForm: React.FC = () => {
  const [brand, setBrand] = useState('');
  const [colorway, setColorway] = useState('');
  const [imageUrl, setImageUrl] = useState(['']);
  const [isAvailable, setIsAvailable] = useState(true);
  const [model, setModel] = useState('');
  const [price, setPrice] = useState(0);
  const [seller, setSeller] = useState('');
  const [size, setSize] = useState(0);
  const [stockAvailable, setStockAvailable] = useState(0);
  const [description, setDescription] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const { address } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (address) {
      setSeller(address);
    }
  }, [address]);

  useEffect(() => {
    // Check if all required fields are populated
    if (brand && model && colorway && size && stockAvailable && description && price > 0 ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [brand, model, colorway, size, stockAvailable, description, price, imageUrl]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // Step 1: Add the sneaker to Firebase
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
        description
      });

      const sneakerId = docRef.id;

      // Step 2: Call the listSneaker function to interact with the smart contract
      const isSneakerListed = await listSneaker(undefined, {
        _id: sneakerId,
        _quantity: stockAvailable,
        _price: price,
      });

      if (!isSneakerListed) {
        alert("Error listing sneaker on blockchain");
        return;
      }

      alert("Product added successfully with ID: " + sneakerId);
      
      // Reset form fields
      setBrand('');
      setColorway('');
      setImageUrl(['']);
      setIsAvailable(true);
      setModel('');
      setPrice(0);
      setSize(0);
      setStockAvailable(0);
      setDescription('');
      
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
            <label className="block mb-2 text-sm font-medium text-gray-600">Model</label>
            <input 
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
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
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-orange-600" 
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">Size</label>
            <input 
              type="number"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-orange-600" 
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">Stock Available</label>
            <input 
              type="number"
              value={stockAvailable}
              onChange={(e) => setStockAvailable(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-orange-600" 
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">Description</label>
            <input 
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-orange-600" 
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">Price (cUSDT)</label>
            <input 
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-orange-600" 
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">Upload Sneaker Images</label>
            <div className='flex p-2'> 
              <div className="flex items-center justify-center w-full">
                  <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-15 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 ">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">PNG or JPG(MAX. 800x400px)</p>
                      </div>
                      <input id="dropzone-file" type="file" className="hidden" />
                  </label>
              </div>
              <div className="flex items-center justify-center w-full">
                  <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-15 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 m-1">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">PNG or JPG(MAX. 800x400px)</p>
                      </div>
                      <input id="dropzone-file" type="file" className="hidden" />
                  </label>
              </div>
              <div className="flex items-center justify-center w-full">
                  <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-15 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 m-1">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">PNG or JPG(MAX. 800x400px)</p>
                      </div>
                      <input id="dropzone-file" type="file" className="hidden" />
                  </label>
              </div>
            </div>
            <div className="flex flex-wrap mb-2 text-sm font-medium text-gray-600">
              <p className='ml-12'>Top view</p>
              <p className='mx-12'>Side view</p>
              <p>Perspective view</p>
            </div>
          </div>
          {/* needs to move to update sneaker */}
          {/* <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">Available</label>
            <input 
              type="checkbox"
              checked={isAvailable}
              onChange={(e) => setIsAvailable(e.target.checked)}
              className="h-4 w-4 text-orange-600 focus:ring focus:ring-orange-600 border-gray-300 rounded" 
            />
          </div> */}
          <button 
            type="submit"
            className="w-full py-2 px-4 bg-orange-600 hover:bg-orange-500 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isButtonDisabled}
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default SellerProductsForm;
