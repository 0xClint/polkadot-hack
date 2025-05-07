export const shortenAddress = (address, length = 4) => {
  if (!address || address?.length < length * 2 + 2) {
    return "";
  }

  const start = address.slice(0, length);
  const end = address.slice(-length);

  return `${start}...${end}`;
};

export const extractCID = (url) => {
  const prefix = "https://gateway.lighthouse.storage/ipfs/";
  return url.startsWith(prefix) ? url.slice(prefix.length) : url;
};
