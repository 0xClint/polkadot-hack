import axios from "axios";

/**
 * Full function to upload a JSON object as a file to Apillon
 * @param {string} bucketUuid - Your Apillon bucket UUID
 * @param {string} credentials - Base64-encoded "projectId:apiKey"
 * @param {string} fileName - Desired name of the file (e.g., data.json)
 * @param {object} jsonData - The actual JSON data to upload
 * @returns {Promise<Object>} - Upload metadata including file URL
 */
export async function uploadJsonToApillon(bucketUuid, credentials) {
  const uploadUrl = `https://api.apillon.io/storage/buckets/${bucketUuid}/upload`;

  // Setting up the request headers and body.
  const headers = {
    Authorization: credentials,
    "Content-Type": "application/json",
  };

  const requestBody = {
    files: [
      {
        fileName: "hellosdd",
        contentType: "application/json",
      },
    ],
  };

  try {
    // Step 1: Request to get the pre-signed upload URL from Apillon
    const response = await axios.post(uploadUrl, requestBody, { headers });
    const uploadInfo = response.data;
    console.log(uploadInfo); // Debug: see the presigned URL

    // Step 2: Extract the URL for the file upload
    const uploadUrlForFile = uploadInfo.data.files[0].url;
    const sessionUuid = uploadInfo.data.sessionUuid;

    const jsonData = {
      name: "John",
      age: 30,
      verified: true,
    };
    const jsonBlob = new Blob([JSON.stringify(jsonData)], {
      type: "application/json",
    });
    const res = await axios.put(
      uploadUrlForFile,
      new Blob(["Some dummy content"], { type: "text/plain" })
    );

    console.log(res);
  } catch (error) {
    console.error(
      "❌ Error uploading JSON to Apillon:",
      error.response?.data || error.message
    );
    throw error;
  }
}
