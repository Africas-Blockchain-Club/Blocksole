import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { db } from '../firebaseConfig';
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAccount } from "wagmi";

const LoginForm: React.FC = () => {
  const { address: walletAddress } = useAccount();
  const [password, setPassword] = useState('');
  const router = useRouter(); 

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!walletAddress) {
      alert("Wallet address is not connected");
      return;
    }

    try {
      const q = query(
        collection(db, "User"),
        where("walletAddress", "==", walletAddress),
        where("password", "==", password)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        alert("Login successful!");
        router.push('/sellerPortal'); // Navigate to /sellerPortal path on successful login
      } else {
        alert("Invalid wallet address or password");
      }
    } catch (e) {
      console.error("Error during login: ", e);
      alert("Error logging in");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-transparent">
  <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
    <h2 className="text-2xl font-bold mb-6 text-center text-orange-600">Login</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-600">Wallet Address</label>
        <input 
          type="text" 
          value={walletAddress ?? ''}
          readOnly
          className="w-full px-3 py-2 border rounded-lg shadow-sm bg-gray-100 cursor-not-allowed" 
        />
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-600">Password</label>
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-orange-600" 
        />
      </div>
      <button 
        type="submit" 
        className="w-full bg-orange-600 text-white py-2 rounded-lg shadow-lg hover:bg-orange-800 focus:outline-none focus:ring-2 focus:ring-orange-600 mb-4"
      >
        Login
      </button>
      <Link href="/register">
        <p className='text-center text-sm text-gray-600'>Not registered? Register here.</p>
      </Link>
    </form>
  </div>
</div>

  );
}

export default LoginForm;
