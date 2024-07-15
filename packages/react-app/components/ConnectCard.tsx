import { Disclosure } from "@headlessui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useConnect } from "wagmi";
import { injected } from "wagmi/connectors";

const MetaMaskConnect = () => {
	const { connect } = useConnect();

	useEffect(() => {
		if (window.ethereum && window.ethereum.isMiniPay) {
			connect({ connector: injected({ target: "metaMask" }) });
		}
	});

	return (
		<Disclosure >
			{({ open }) => (
				<div className="flex justify-center" style={{ marginTop: "1rem" }} >
					<ConnectButton
						showBalance={{
							smallScreen: false,
							largeScreen: false,
						}}
					/>

				</div>

			)}
		</Disclosure>
	);
}

export default MetaMaskConnect;