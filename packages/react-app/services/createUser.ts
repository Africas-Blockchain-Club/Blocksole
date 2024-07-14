import { createPublicClient, createWalletClient, custom, http, parseTransaction } from "viem";
import { celoAlfajores } from "viem/chains";
import { MarketplaceContractABI } from "@/utils/abis/Marketplace";
import { MarketplaceContractAddress } from "@/utils/addresses/MarketplaceContractAddress";


export const createUser = async (
    _signerAddress: `0x${string}` | undefined, { _address }: CreateUserProps
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
                const createUserTxnHash = await privateClient.writeContract({
                    account: address,
                    address: MarketplaceContractAddress,
                    abi: MarketplaceContractABI,
                    functionName: "registerBuyer",
                    args: [address],
                });

                const createUserTxnReceipt = await publicClient.waitForTransactionReceipt({
                    hash: createUserTxnHash
                });

                if (createUserTxnReceipt.status == "success") {
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



export type CreateUserProps = {
    _address: string;
};