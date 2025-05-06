export const shortenAddress = (address, length = 4) => {
  if (!address || address?.length < length * 2 + 2) {
    return "";
  }

  const start = address.slice(0, length);
  const end = address.slice(-length);

  return `${start}...${end}`;
};
