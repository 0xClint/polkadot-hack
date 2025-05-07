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
import { uploadFile } from "./lighthouse";
import axios from "axios";
import { parseEther, parseGwei } from "viem";

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
  "https://gateway.lighthouse.storage/ipfs/bafkreidyevlkczvv6udlnvuhl7fuvbivesic27pzip2o2txeg6c2324dkm";

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

export const getOwnerNftsFunc = async () => {
  const account = getAccount(wagmiConfig);
  try {
    // const res = await axios.get(
    //   `https://blockscout-asset-hub.parity-chains-scw.parity.io/api/v2/addresses/${account.address}/nft?type=ERC-721%2CERC-404%2CERC-1155`
    // );
    // let data = res.data.items;

    // data = data.filter(
    //   ({ token }) =>
    //     token.address.toLowerCase() === WORLD_CONTRACT_ADDRESS.toLowerCase()
    // );
    // console.log(data);
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

// // ***********item NFT contract************

// export const getItemNFTsByOwnerFunc = async (signer) => {
//   try {
//     const contract = new ethers.Contract(
//       ITEM_NFT_CONTRACT_ADDRESS,
//       ITEM_NFT_CONTRACT_ABI,
//       signer
//     );
//     const account = await signer.getAddress();
//     const res = await contract.getItemsForUser(account);
//     return res;
//   } catch (error) {
//     console.error("Error calling contract function:", error);
//   }
// };

// // ***********item NFT contract************

// export const createCustomItemFunc = async (signer, name, description) => {
//   try {
//     const contract = new ethers.Contract(
//       ITEM_NFT_CONTRACT_ADDRESS,
//       ITEM_NFT_CONTRACT_ABI,
//       signer
//     );
//     const tx = await contract.createItemByUser(
//       name,
//       description,
//       10000,
//       100,
//       parseInt(1000 * Math.random())
//     );
//     await tx.wait();
//   } catch (error) {
//     console.error("Error calling contract function:", error);
//   }
// };
// export const getNextItemIDFunc = async (signer) => {
//   try {
//     const contract = new ethers.Contract(
//       ITEM_NFT_CONTRACT_ADDRESS,
//       ITEM_NFT_CONTRACT_ABI,
//       signer
//     );
//     const account = await signer.getAddress();
//     const res1 = await contract.nextItemId();
//     const res2 = await contract.items(Number(res1) - 1);
//     return res2.owner == account ? res2 : null;
//   } catch (error) {
//     console.error("Error calling contract function:", error);
//   }
// };
