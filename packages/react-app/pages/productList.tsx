// src/components/ProductsList.js
import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

interface Product {
  id: string;
  brand: string;
  model: string;
  colorway: string;
  price: number;
  imageUrl: string[];
}

const ProductsList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Product[];
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{product.brand}</h2>
            <p className="text-gray-600 mb-2">{product.model}</p>
            <p className="text-gray-600 mb-4">{product.colorway}</p>
            <p className="text-gray-800 font-bold">${product.price}</p>
            <div className="grid grid-cols-1 gap-4">
              {product.imageUrl.map((url, index) => (
                <img key={index} src={url} alt={`Product ${index}`} className="rounded-lg shadow-md" />
              ))}
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
              Buy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
