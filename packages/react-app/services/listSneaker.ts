// /services/listSneaker.tsx
import {
    createPublicClient,
    createWalletClient,
    custom,
    http,
    parseTransaction,
} from "viem";
import { celoAlfajores } from "viem/chains";
import { MarketplaceContractABI } from "@/utils/abis/Marketplace";
import { MarketplaceContractAddress } from "@/utils/addresses/MarketplaceContractAddress";

export type ListSneakerProps = {
    _id: string;
    _quantity: number;
    _price: number;
};

export const listSneaker = async (
    _signerAddress: `0x${string}` | undefined,
    { _id, _quantity, _price }: ListSneakerProps
): Promise<boolean> => {
    if (window.ethereum) {
        try {
            const privateClient = createWalletClient({
                chain: celoAlfajores,
                transport: custom(window.ethereum),
            });
            const publicClient = createPublicClient({
                chain: celoAlfajores,
                transport: custom(window.ethereum),
            });
            const [address] = await privateClient.getAddresses();
            try {
                const listSneakerTxnHash = await privateClient.writeContract({
                    account: address,
                    address: MarketplaceContractAddress,
                    abi: MarketplaceContractABI,
                    functionName: "listSneaker",
                    args: [_id, _quantity, _price],
                });

                const listSneakerTxnReceipt = await publicClient.waitForTransactionReceipt({
                    hash: listSneakerTxnHash,
                });

                if (listSneakerTxnReceipt.status == "success") {
                    return true;
                }
                return false;
            } catch (err) {
                console.error(err);
                return false;
            }
        } catch (error) {
            return false;
        }
    }
    return false;
};
