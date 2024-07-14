
import React from 'react';
import Link from 'next/link'

const AuthForm = () => {
  return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-teal-100 px-4">
        <div className="bg-black rounded-lg shadow-lg overflow-hidden w-full max-w-4xl flex flex-col md:flex-row">
          <div className="bg-black-500 p-8 flex flex-col justify-center w-full md:w-1/2">
            <h2 className="text-3xl font-bold mb-6 text-white">Information</h2>
            <p className="mb-4 text-white">
            Our Sneaker store offers a prime platform for showcasing your athletic footwear. 
            Partner with us to reach a diverse customer base seeking top brands like Nike, Adidas, and Puma. Benefit from our high foot traffic, extensive marketing, and reputation for quality and fashion-forward selections. 
            Boost your brand&apos;s visibility and sales in the competitive sneaker market with us.
            </p>
            <Link href="/login">
              <button className="bg-white text-black-500 py-2 px-4 rounded-lg shadow-lg hover:bg-gray-200">
                Have An Account
              </button>
            </Link>
          </div>
          <div className="w-full md:w-1/2 p-8">
          </div>
        </div>
      </div>
  );
};

export default AuthForm;
