import axios from "axios";
import React, { useState } from "react";
import {
  WORLD_CONTRACT_ABI,
  WORLD_CONTRACT_ADDRESS,
} from "../contracts/constant";
import { getBalance, getBlockNumber, readContract } from "@wagmi/core";
import { wagmiConfig } from "../utils/wagmiConfig";
import {
  createItemsFunc,
  createWorldFunc,
  getItemDataFunc,
  getNFTsByOwnerFunc,
  getOwnerNftsFunc,
  getTokenID,
  mintitemNFTFunc,
  transferWorldFunc,
} from "../utils/contractFunctionCall";

export default function Admin() {
  const getTokenNumber = async () => {
    await getTokenID();
  };
  const createWorld = async () => {
    await createWorldFunc();
  };
  const updateWorld = async () => {
    await createWorldFunc();
  };
  const getOwnerLands = async () => {
    await getOwnerNftsFunc();
  };
  const getOwnerItems = async () => {
    await getNFTsByOwnerFunc();
  };

  const createNFTItems = async () => {
    await createItemsFunc("Grass-3", "Grass-3", 100, 2);
  };
  const mintitemNFT = async () => {
    await mintitemNFTFunc(0);
  };
  const transferNFT = async () => {
    await transferWorldFunc("0xf1E507654e8E8b35bf467fd255c1c5787527aC2D",0);
  };

  return (
    <div className="adminpage w-screen flex flex-col px-20 gap-10 pt-10">
      <button onClick={getTokenNumber} className="btn">
        getTokenNumber
      </button>
      <button onClick={getOwnerLands} className="btn">
        getOwnerLands
      </button>
      <button onClick={createWorld} className="btn">
        createWorld
      </button>
      <button onClick={updateWorld} className="btn">
        updateWorld
      </button>
      <button onClick={getOwnerItems} className="btn">
        getOwnerItems
      </button>
      <button onClick={createNFTItems} className="btn">
        createNFTItems
      </button>
      <button onClick={mintitemNFT} className="btn">
        mintitemNFT
      </button>
      <button onClick={transferNFT} className="btn">
        transferNFT
      </button>
    </div>
  );
}
