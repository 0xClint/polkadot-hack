import axios from "axios";
import React, { useState } from "react";
import {
  WORLD_CONTRACT_ABI,
  WORLD_CONTRACT_ADDRESS,
} from "../contracts/constant";
import { useReadContract } from "wagmi";
import { getBalance, getBlockNumber, readContract } from "@wagmi/core";
import { wagmiConfig } from "../utils/wagmiConfig";
import { uploadJsonToApillon } from "../utils/ApillonStorageApi";

const ENDPOINT = "https://api.apillon.io";
const key = "d9634e86-355c-4ebf-a42a-ab65915446c0";
const secret = "#CLUWWTAiZ5x";
const Auth =
  "Basic ZDk2MzRlODYtMzU1Yy00ZWJmLWE0MmEtYWI2NTkxNTQ0NmMwOiNDTFVXV1RBaVo1eA==";
const bucketUUID = "453c91c1-7f45-462f-bf57-7cca993c072d";

export default function Admin() {
  const getbucketList = async () => {
    try {
      const response = await axios.get(`${ENDPOINT}/storage/buckets`, {
        headers: {
          Authorization: Auth,
          "Content-Type": "application/json",
        },
      });
      console.log(response);
    } catch (error) {
      console.error("GET error:", error);
    }
  };

  const getContractData = async () => {
    const res1 = await readContract(wagmiConfig, {
      address: WORLD_CONTRACT_ADDRESS,
      abi: WORLD_CONTRACT_ABI,
      functionName: "maxSupply",
    });
    console.log(res1);

    const blockNumber = await getBlockNumber(wagmiConfig);
    console.log(blockNumber);
    const balance = await getBalance(wagmiConfig, {
      address: "0x77B708A7102A2e905a056BFC34d82631138918CC",
    });
    console.log(balance);
  };

  const uploadData = async () => {
    const fileName = "my-data";
    const jsonData = {
      user: "Apillon bucket",
      score: 99,
    };
  };

  const getbucketContent = async () => {
    try {
      const response = await axios.get(
        `${ENDPOINT}/storage/buckets/${bucketUUID}/content`,
        {
          headers: {
            Authorization: Auth,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data.data);
    } catch (error) {
      console.error("GET error:", error);
    }
  };

  const getListFiles = async () => {
    try {
      const response = await axios.get(
        `${ENDPOINT}/storage/buckets/${bucketUUID}/files`,
        {
          headers: {
            Authorization: Auth,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data.data);
    } catch (error) {
      console.error("GET error:", error);
    }
  };

  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    await uploadJsonToApillon(bucketUUID, Auth);
  };

  const getContent = async () => {
    const res = await axios.get(
      "https://bafybeia67ycfc3yj7fj6iequdnynaynmgmhscjvbsgm52t52elsncyneyu.ipfs.web3approved.com/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaWQiOiJiYWZ5YmVpYTY3eWNmYzN5ajdmajZpZXF1ZG55bmF5bm1nbWhzY2p2YnNnbTUydDUyZWxzbmN5bmV5dSIsInByb2plY3RfdXVpZCI6ImZhZmI2MDhmLTNlMGEtNGIyYi04OGViLWJhMzlmNWE2ODVjNiIsImlhdCI6MTc0NjU2MDc5MCwic3ViIjoiSVBGUy10b2tlbiJ9.NgRX7kKfQIhGW3gx5LIids4_ARbbrFCPCwzNlu8zptw"
    );
    console.log(res);
  };
  return (
    <div className="adminpage w-screen flex flex-col px-20 gap-10 pt-10">
      <button onClick={getContractData}>getContractData</button>
      <button className=" btn w-1/2 make-flex flex-col" onClick={getbucketList}>
        getbucketList
      </button>
      <button onClick={uploadData} className="btn">
        uploadData
      </button>
      <button onClick={getbucketContent} className="btn">
        getbucketContent
      </button>
      <button onClick={getListFiles} className="btn">
        getListFiles
      </button>
      <button onClick={getContent} className="btn">
        getContent
      </button>
      <div>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={handleUpload}>Upload to S3</button>
      </div>
    </div>
  );
}
