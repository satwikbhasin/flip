import { Button, Typography, Box } from "@mui/material";
import Cookies from "js-cookie";
import { useState } from "react";

const RevealOutcome = ({ contract, winnerName, playerName }) => {
  const [revealed, setRevealed] = useState(false);
  const [winnre, setWinner] = useState("null");

  const handleReveal = async () => {
    setRevealed(true);
    if (contract) {
      try {
        await contract.revealResults();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        padding: "50px",
      }}
    >
      <Typography variant="h2">Reveal Outcome</Typography>
      <Button variant="contained" color="primary" onClick={handleReveal}>
        Reveal
      </Button>
      {revealed &&
        winnerName &&
        (winnerName.toLowerCase() === "draw" ? (
          <Typography variant="h3" color="text.secondary">
            It's a Draw
          </Typography>
        ) : winnerName == Cookies.get("player") ? (
          <Typography variant="h3" color="success.main">
            You Win
          </Typography>
        ) : (
          <Typography variant="h3" color="error.main">
            You Lose
          </Typography>
        ))}
    </Box>
  );
};

export default RevealOutcome;
