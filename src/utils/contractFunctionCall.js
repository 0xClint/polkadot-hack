import {
  ITEM_NFT_CONTRACT_ABI,
  ITEM_NFT_CONTRACT_ADDRESS,
  WORLD_CONTRACT_ABI,
  WORLD_CONTRACT_ADDRESS,
} from "../contracts/constant";
import {
  getAccount,
  readContract,
  simulateContract,
  waitForTransactionReceipt,
  writeContract,
} from "@wagmi/core";
import { wagmiConfig } from "./wagmiConfig";
import { uploadFile } from "./apillonStorage";

// ***********world NFT contract************
export const getTokenID = async () => {
  const nextToken = await readContract(wagmiConfig, {
    abi: WORLD_CONTRACT_ABI,
    address: WORLD_CONTRACT_ADDRESS,
    functionName: "nextTokenId",
  });
  console.log(nextToken);
};

const NFT_LAND_IMAGE =
  "https://ipfs.io/ipfs/bafkreidyevlkczvv6udlnvuhl7fuvbivesic27pzip2o2txeg6c2324dkm";

export const createWorldFunc = async (
  name = "world",
  description = "world description"
) => {
  const CID = await uploadFile({
    cubes: [],
    items: [],
    description,
    name,
    image: NFT_LAND_IMAGE,
  });
  const account = getAccount(wagmiConfig);

  console.log(CID);
  try {
    const nextToken = await readContract(wagmiConfig, {
      abi: WORLD_CONTRACT_ABI,
      address: WORLD_CONTRACT_ADDRESS,
      functionName: "nextTokenId",
    });
    console.log(nextToken);

    const { request } = await simulateContract(wagmiConfig, {
      abi: WORLD_CONTRACT_ABI,
      address: WORLD_CONTRACT_ADDRESS,
      functionName: "createWorld",
      args: [account.address, CID, name, description, 1],
    });

    const hash = await writeContract(wagmiConfig, request);
    console.log(hash);
    await waitForTransactionReceipt(wagmiConfig, {
      hash,
    });

    return { nextToken, CID };
  } catch (error) {
    console.error("Error calling contract function:", error);
  }
};

export const updateWorldFunc = async (tokenID, objData) => {
  const CID = await uploadFile(objData);
  try {
    const { request } = await simulateContract(wagmiConfig, {
      abi: WORLD_CONTRACT_ABI,
      address: WORLD_CONTRACT_ADDRESS,
      functionName: "updateURI",
      args: [tokenID, CID],
    });

    const hash = await writeContract(wagmiConfig, request);
    console.log(hash);
    await waitForTransactionReceipt(wagmiConfig, {
      hash,
    });
  } catch (error) {
    console.error("Error calling contract function:", error);
  }
};
export const transferWorldFunc = async (receipentAddress, tokenId) => {
  const account = getAccount(wagmiConfig);
  try {
    const { request } = await simulateContract(wagmiConfig, {
      abi: WORLD_CONTRACT_ABI,
      address: WORLD_CONTRACT_ADDRESS,
      functionName: "transferWorld",
      args: [account.address, receipentAddress, tokenId],
    });

    const hash = await writeContract(wagmiConfig, request);
    console.log(hash);
    await waitForTransactionReceipt(wagmiConfig, {
      hash,
    });
  } catch (error) {
    console.error("Error calling contract function:", error);
  }
};

export const getOwnerNftsFunc = async () => {
  const account = getAccount(wagmiConfig);
  try {
    const res = await readContract(wagmiConfig, {
      abi: WORLD_CONTRACT_ABI,
      address: WORLD_CONTRACT_ADDRESS,
      functionName: "getNFTsByOwner",
      args: [account.address],
    });
    console.log(res);
    return res;
  } catch (error) {
    console.error("Error calling contract function:", error);
  }
};

//NO
export const getItemDataFunc = async (id) => {
  try {
    const res = await readContract(wagmiConfig, {
      abi: ITEM_NFT_CONTRACT_ABI,
      address: ITEM_NFT_CONTRACT_ADDRESS,
      functionName: "items",
      args: [id],
    });
    console.log(res);
    return res;
  } catch (error) {
    console.error("Error calling contract function:", error);
  }
};

export const createItemsFunc = async (
  name,
  description,
  price,
  tagId,
  maxSupply = 1000000,
  itemType = 1
) => {
  try {
    const { request } = await simulateContract(wagmiConfig, {
      abi: ITEM_NFT_CONTRACT_ABI,
      address: ITEM_NFT_CONTRACT_ADDRESS,
      functionName: "createItemByUser",
      args: [name, description, price, maxSupply, tagId],
    });

    const hash = await writeContract(wagmiConfig, request);
    console.log(hash);
    await waitForTransactionReceipt(wagmiConfig, {
      hash,
    });
  } catch (error) {
    console.error("Error calling contract function:", error);
  }
};

export const mintitemNFTFunc = async (itemID) => {
  try {
    const { request } = await simulateContract(wagmiConfig, {
      abi: ITEM_NFT_CONTRACT_ABI,
      address: ITEM_NFT_CONTRACT_ADDRESS,
      functionName: "mint",
      args: [itemID],
    });

    const hash = await writeContract(wagmiConfig, request);
    console.log(hash);
    await waitForTransactionReceipt(wagmiConfig, {
      hash,
    });
  } catch (error) {
    console.error("Error calling contract function:", error);
  }
};

export const getNFTsByOwnerFunc = async (signer) => {
  const account = getAccount(wagmiConfig);
  try {
    const res = await readContract(wagmiConfig, {
      abi: ITEM_NFT_CONTRACT_ABI,
      address: ITEM_NFT_CONTRACT_ADDRESS,
      functionName: "getItemsForUser",
      args: [account.address],
    });
    const data = res.map((item) => Number(item));
    // console.log(data);
    return data;
  } catch (error) {
    console.error("Error calling contract function:", error);
  }
};
