import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useConnect } from "wagmi";
import { injected } from "wagmi/connectors";


const Header: React.FC = () => {
    return (
      <header className="flex items-center justify-between p-4 bg-black text-white">
        <h1 className="text-2xl font-bold">BlockSole</h1>
        <p>est. 2024</p>
        <nav>
          <a href="/" className="mx-2">Home</a>
          <a href="/account" className="mx-2">Account</a>
        </nav>
      </header>
    );
  };
  
  export default Header;
  
