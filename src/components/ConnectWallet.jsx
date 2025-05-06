import { injected, useAccount, useConnect, useDisconnect } from "wagmi";
import { TbWalletOff } from "react-icons/tb";
import { FaUserCircle } from "react-icons/fa";
import { shortenAddress } from "../helpers/convertor";

function Account() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <div
      className="card-container flex-center"
      // className="bg-primary card-container  p-0 flex-center  cursor-pointer "
    >
      {address && (
        <div className="p-2 flex-center gap-2">
          <FaUserCircle className="text-2xl " />
          {shortenAddress(address)}
        </div>
      )}
      <button
        onClick={() => disconnect()}
        className="h-full border-l-2 p-2 border-black"
      >
        <TbWalletOff className="text-2xl hover:scale-105" />
      </button>
    </div>
  );
}

export function ConnectWallet() {
  const { isConnected } = useAccount();
  const { connect } = useConnect();
  if (isConnected) return <Account />;
  else
    return (
      <button
        // className="bg-primary card-container text-[#62832d] px-2 py-1 cursor-pointer hover:bg-primary/80"
        className="btn"
        onClick={() => connect({ connector: injected() })}
      >
        Connect
      </button>
    );
}
