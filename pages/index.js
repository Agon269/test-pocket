import styles from "../styles/Home.module.css";
import { useState } from "react";
const pocketJS = require("@pokt-network/pocket-js");

export default function Home() {
  const [param, setParam] = useState("");

  const getAddress = async (e) => {
    e.preventDefault();
    const { Pocket, Configuration, HttpRpcProvider } = pocketJS;
    const dispatchURL = new URL("https://node1.mainnet.pokt.network:443");
    const rpcProvider = new HttpRpcProvider(dispatchURL);
    const configuration = new Configuration(5, 1000, 0, 40000);
    const pocketInstance = new Pocket(
      [dispatchURL],
      rpcProvider,
      configuration
    );

    const accountAddress = "01d3f8d29c7d3da9bc6e9f77e7cc89da8d3e65c6";
    const balance = await pocketInstance.rpc().query.getBalance(accountAddress);
    console.log("Account Balance: " + balance);
    console.log(param);
  };

  return (
    <div className={styles.container}>
      <h1>Check you balance</h1>
      <form onSubmit={(e) => getAddress(e)}>
        <input
          type="text"
          onChange={(e) => setParam(e.target.value)}
          placeholder="pocket address"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
