import { Popover, Button, Paper } from "@mui/material";
import { useState, useEffect } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { formatEther } from "@ethersproject/units";

function Wallet({ walletAnchor, handleCloseWallet }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [balance, setBalance] = useState(0);
  const [account, setAccount] = useState("");

  async function checkWalletConnection() {
    try {
      const provider = new Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts");
      const balance = await provider.getBalance(accounts[0]); 
      setLoggedIn(true);
      setAccount(accounts[0]); 
      setBalance(formatEther(balance)); 
    } catch (error) {
      console.error("Error checking wallet connection:", error);
    }
  }

  useEffect(() => {
    checkWalletConnection();
  }, []);

  async function connectWallet() {
    try {
      const provider = new Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      setLoggedIn(true);

      const accounts = await provider.send("eth_accounts");
      const balance = await provider.getBalance(accounts[0]);
      setAccount(accounts[0]);
      setBalance(formatEther(balance));
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  }

  return (
    <Popover
      open={Boolean(walletAnchor)}
      anchorEl={walletAnchor}
      onClose={handleCloseWallet}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "10px",
          alignItems: "center",
          justifyContent: "center",
        }}
        onMouseEnter={() => {}}
        onMouseLeave={handleCloseWallet}
      >
        {loggedIn ? (
          <>
            <p style={{ color: "#1A8E00" }}>Connected</p>
            <p>{account}</p>
            <p>Balance: {balance}</p>
          </>
        ) : (
          <Button onClick={connectWallet}>Connect</Button>
        )}
      </Paper>
    </Popover>
  );
}

export default Wallet;
