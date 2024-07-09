import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useConnect } from "wagmi";
import { injected } from "wagmi/connectors";
import Account from "./account";
import ConnectCard from "../components/ConnectCard"


export default function Home() {
    const [userAddress, setUserAddress] = useState("");
    const [isMounted, setIsMounted] = useState(false);
    const { address, isConnected } = useAccount();
    const [hideConnectBtn, setHideConnectBtn] = useState(false);
    const { connect } = useConnect();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isConnected && address) {
            setUserAddress(address);
        }
    }, [address, isConnected]);

    useEffect(() => {
        if (window.ethereum && window.ethereum.isMiniPay) {
            setHideConnectBtn(true);
            connect({ connector: injected({ target: "metaMask" }) });
        }
    }, [])

    if (!isMounted) {
        return null;
    }

    return (
        <div className="flex flex-col justify-center items-center">
            {isConnected ? (
                <>
                <div style={{ marginBottom: "4rem" }}>
                    <img src="/homeSneaker.png" alt="Home Sneaker" className="w-full max-w-md mx-auto mb-4 "  />
                    <h1 className="text-4xl font-bold mb-4 font-sans">BlockSole</h1>
                </div>
                <Account />
                </>
                
            ) : (

                <>
                <div style={{ marginBottom: "4rem" }}>
                    <img src="/homeSneaker.png" alt="Home Sneaker" className="w-full max-w-md mx-auto mb-4 "  />
                    <h1 className="text-4xl font-bold mb-4 font-sans">BlockSole</h1>
                </div>
                
                <ConnectCard />
                </>   
            )}
        </div>
    );
}


