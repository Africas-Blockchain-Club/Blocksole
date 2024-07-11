import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { db } from '../firebaseConfig';
import { collection, query, where, getDocs } from "firebase/firestore";

const LoginForm: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); 

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const q = query(collection(db, "User"), where("walletAddress", "==", walletAddress), where("password", "==", password));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        alert("Login successful!");
        router.push('/sellerProducts'); // Navigate to /sellerProducts path on successful login
      } else {
        alert("Invalid wallet address or password");
      }
    } catch (e) {
      console.error("Error during login: ", e);
      alert("Error logging in");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">Wallet Address</label>
            <input 
              type="text" 
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200" 
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-600">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200" 
            />
          </div>
          <button type="submit" className="w-full bg-gray-500 text-white py-2 rounded-lg shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
            Login
          </button>
          <br />
          <Link href="/register">
            <p className='items-center justify-center text-center pt-5'>Not registered?</p>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;




// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { db } from '../firebaseConfig';
// import { collection, query, where, getDocs } from "firebase/firestore";

// const LoginForm: React.FC = () => {
//   const [walletAddress, setWalletAddress] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     try {
//       const q = query(collection(db, "User"), where("walletAddress", "==", walletAddress), where("password", "==", password));
//       const querySnapshot = await getDocs(q);

//       if (!querySnapshot.empty) {
//         alert("Login successful!");
//         // Redirect or handle successful login
//       } else {
//         alert("Invalid wallet address or password");
//       }
//     } catch (e) {
//       console.error("Error during login: ", e);
//       alert("Error logging in");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block mb-2 text-sm font-medium text-gray-600">Wallet Address</label>
//             <input 
//               type="text" 
//               value={walletAddress}
//               onChange={(e) => setWalletAddress(e.target.value)}
//               className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200" 
//             />
//           </div>
//           <div className="mb-6">
//             <label className="block mb-2 text-sm font-medium text-gray-600">Password</label>
//             <input 
//               type="password" 
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200" 
//             />
//           </div>
//           <button type="submit" className="w-full bg-gray-500 text-white py-2 rounded-lg shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
//             Login
//           </button>
//           <br />
//           <Link to="/register">
//             <p className='items-center justify-center text-center pt-5'>Not registered?</p>
//           </Link>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default LoginForm;


// src/components/LoginForm.js

// import React from 'react';
// import { Link } from 'react-router-dom';


// const LoginForm = () => {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
//         <form>
//           <div className="mb-4">
//             <label className="block mb-2 text-sm font-medium text-gray-600">Wallet-address</label>
//             <input type="email" className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200" />
//           </div>
//           <div className="mb-6">
//             <label className="block mb-2 text-sm font-medium text-gray-600">Password</label>
//             <input type="password" className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200" />
//           </div>
//           <button type="submit" className="w-full bg-gray-500 text-white py-2 rounded-lg shadow-lg hover:bg-black-700 focus:outline-none focus:ring-2 focus:ring-blue-400">Login</button>
//           <br />
//           <Link to="/register">
//             <p className='items-center justify-center text-center pt-5'>Not registered</p>
//           </Link>
          
//         </form>
//       </div>
//     </div>
//   );
// }

// export default LoginForm;
