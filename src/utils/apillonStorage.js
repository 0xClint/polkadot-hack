import { Storage, LogLevel } from "@apillon/sdk";

const storage = new Storage({
  key: process.env.REACT_APP_APILLON_API_KEY,
  secret: process.env.REACT_APP_APILLON_API_SECRET,
  logLevel: LogLevel.VERBOSE,
});

export const uploadFile = async (jsonData) => {
  const jsonBlob = new Blob([JSON.stringify(jsonData)], {
    type: "application/json",
  });
  await bucket.uploadFiles([
    {
      fileName: "world.json",
      contentType: "application/json",
      content: jsonBlob,
    },
  ]);
};

export const getBucketData = async () => {
  const bucket = storage.bucket(process.env.REACT_APP_APILLON_BUCKET);
};
