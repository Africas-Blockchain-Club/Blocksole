// components/Header.tsx
import React, { useState } from 'react';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from 'next/link';
import SearchBar from '../pages/searchBar';

const Header: React.FC<{ showSearch: boolean }> = ({ showSearch }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <><header className="flex flex-col items-center justify-between p-4 bg-white text-black border-black border-b fixed top-0 left-0 w-full z-50">
      <div className="flex items-center justify-between w-full">
        <Link href={"/"}>
          <h1 className="text-2xl font-bold">BlockSole</h1>
        </Link>
        <ConnectButton
          accountStatus={{
            smallScreen: 'avatar',
            largeScreen: 'full',
          }} />
        <nav className="hidden lg:flex">
          <Link href="/" className="mx-2">Home</Link>
          <Link href="/login" className="mx-2">Seller Portal</Link>
        </nav>
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-2xl">
            &#9776; {/* Hamburger icon */}
          </button>
          {isOpen && (
            <div className="absolute right-4 top-16 bg-black text-white p-2 rounded-md shadow-md">
              <Link href="/" className="block px-4 py-2">Home</Link>
              <Link href="/login" className="block px-4 py-2">Seller Portal</Link>
            </div>
          )}
        </div>
      </div>

    </header></>
  );
};

export default Header;  
