import {
    createPublicClient,
    createWalletClient,
    custom,
} from "viem";
import { celoAlfajores } from "viem/chains";
import { MarketplaceContractABI } from "@/utils/abis/Marketplace";
import { MarketplaceContractAddress } from "@/utils/addresses/MarketplaceContractAddress";
import { cUSDAlfajoresContractABI } from "@/utils/abis/cUSDAlfajoresContractAbi"; // Import cUSD contract ABI
import { cUSDAlfajoresContractAddress } from "@/utils/addresses/cUSDAlfajoresContractAddresses"; // Import cUSD contract address

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

            // Approve the cUSD transfer
            const approveTxnHash = await privateClient.writeContract({
                account: address,
                address: cUSDAlfajoresContractAddress,
                abi: cUSDAlfajoresContractABI,
                functionName: "approve",
                args: [MarketplaceContractAddress, (_amount * 1e18)],
            });

            const approveTxnReceipt = await publicClient.waitForTransactionReceipt({
                hash: approveTxnHash,
            });

            if (approveTxnReceipt.status !== "success") {
                return false;
            }

            // Transfer cUSD to the marketplace contract
            const transferTxnHash = await privateClient.writeContract({
                account: address,
                address: cUSDAlfajoresContractAddress,
                abi: cUSDAlfajoresContractABI,
                functionName: "transferFrom",
                args: [address, MarketplaceContractAddress, _amount],
            });

            const transferTxnReceipt = await publicClient.waitForTransactionReceipt({
                hash: transferTxnHash,
            });

            if (transferTxnReceipt.status !== "success") {
                return false;
            }

            // Call the placeOrder function on the marketplace contract
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

            return placeOrderTxnReceipt.status == "success";
        } catch (err) {
            console.error(err);
            return false;
        }
    }
    return false;
};