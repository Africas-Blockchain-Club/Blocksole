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

export const completeOrder = async (
    _orderNumber: number // Assuming you have the order number to complete
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
                const completeOrderTxnHash = await privateClient.writeContract({
                    account: address,
                    address: MarketplaceContractAddress,
                    abi: MarketplaceContractABI,
                    functionName: "completeOrder",
                    args: [_orderNumber],
                });

                const completeOrderTxnReceipt = await publicClient.waitForTransactionReceipt({
                    hash: completeOrderTxnHash,
                });

                if (completeOrderTxnReceipt.status == "success") {
                    return true;
                }
                return false;
            } catch (err) {
                console.error(err);
                return false;
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    }
    return false;
};

export const placeOrder = async (
    _orderNumber: number,
    _amount: number,
    _sneakerIds: string[]
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
                const placeOrderTxnHash = await privateClient.writeContract({
                    account: address,
                    address: MarketplaceContractAddress,
                    abi: MarketplaceContractABI,
                    functionName: "placeOrder",
                    args: [_orderNumber, _amount, _sneakerIds],
                });

                const placeOrderTxnReceipt = await publicClient.waitForTransactionReceipt({
                    hash: placeOrderTxnHash,
                });

                if (placeOrderTxnReceipt.status == "success") {
                    return true;
                }
                return false;
            } catch (err) {
                console.error(err);
                return false;
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    }
    return false;
};
