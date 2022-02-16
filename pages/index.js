import styles from "../styles/Home.module.css";
import { useState } from "react";
import { validateAddressHex } from "@pokt-network/pocket-js";

const pocketJS = require("@pokt-network/pocket-js");

export default function Home() {
  const [param, setParam] = useState("");
  const [returnBalance, setReturnBalance] = useState();
  const getAddress = async (e) => {
    e.preventDefault();
    //initializing pocket
    const { Pocket, Configuration, HttpRpcProvider } = pocketJS;
    const dispatchURL = new URL(
      "https://mainnet.gateway.pokt.network/v1/lb/620d456199eef60039c39364"
    );
    const rpcProvider = new HttpRpcProvider(dispatchURL);
    const configuration = new Configuration(5, 1000, 0, 40000);
    const pocketInstance = new Pocket(dispatchURL, rpcProvider, configuration);

    //check if user entered the right type of address
    let account;
    let isValidAddress;
    try {
      isValidAddress = !(validateAddressHex(param) instanceof Error);
    } catch (e) {
      // Handle the error
      console.log(e + "---Invalid address");
    }
    if (isValidAddress === undefined || isValidAddress === true) {
      account = param;
    } else {
      account = "01d3f8d29c7d3da9bc6e9f77e7cc89da8d3e65c6";
    }

    //get address balance
    let balance;
    try {
      balance = await pocketInstance.rpc().query.getBalance(account);
    } catch (e) {
      console.log(e + "----BALANCE Error");
    }

    setReturnBalance(balance.toJSON().balance / 1000000);
  };

  return (
    <div className={styles.container}>
      <h1>Check your pocket</h1>
      <form onSubmit={(e) => getAddress(e)}>
        <input
          type="text"
          onChange={(e) => setParam(e.target.value)}
          placeholder="pocket address"
        />
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
      {returnBalance ? (
        <div className="data">
          <p>Balance : {returnBalance} </p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
