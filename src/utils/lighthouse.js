import lighthouse from "@lighthouse-web3/sdk";

export const uploadFile = async (data) => {
  if (data) {
    console.log(data);
    const output = await lighthouse.uploadText(
      JSON.stringify(data),
      process.env.REACT_APP_LIGHTHOUSE,
      "land.json"
    );
    console.log("File Status:", output.data.Hash);
    return output.data.Hash;
  }
};
