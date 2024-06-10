import React, { useState } from "react";
const ethers = require("ethers");
import { Button, Grid } from "@mui/material";

const PlaceBet = ({ updateData, contract }) => {
  const [choice, setChoice] = useState(null);
  const { utils, BigNumber } = ethers;

  const handleBet = async () => {
    if (contract && choice !== null) {
      try {
        const choiceAsBigNumber = BigNumber.from(choice);
        const tx = await contract.placeBet(choiceAsBigNumber, {
          value: utils.parseEther("1.0"),
        });
        await tx.wait();
        alert("Bet placed successfully");
        updateData();
      } catch (error) {
        console.error(error);
        alert("Failed to place bet");
      }
    }
  };

  return (
    <div style={{ maxWidth: "100%", boxSizing: "border-box" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          flexDirection: "column",
          padding: "1em",
        }}
      >
        <p style={{ fontSize: "20px", textAlign: "center" }}>Place your bet [1 ETH]</p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Button
            variant={choice === 0 ? "contained" : "outlined"}
            onClick={() => setChoice(0)}
            style={{ margin: "0.5em" }}
          >
            Heads
          </Button>
          <Button
            variant={choice === 1 ? "contained" : "outlined"}
            onClick={() => setChoice(1)}
            style={{ margin: "0.5em" }}
          >
            Tails
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleBet}
            disabled={choice === null}
            style={{ margin: "0.5em" }}
          >
            Confirm Bet
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlaceBet;
