'use client'
import React, { useState, useEffect } from 'react';
import { Web3Provider } from "@ethersproject/providers";
import { AddressZero } from '@ethersproject/constants';
import CoinFlipContract from './contracts/CoinFlipContract.json';
import { Button, Skeleton, Box } from '@mui/material';
import PlaceBet from './components/PlaceBet';
import { RefreshCw } from 'lucide-react';
import "./styling.css"

const ethers = require("ethers");

export default function Home() {
  const [playerNumber, setPlayerNumber] = useState(null);
  const [currentStage, setCurrentStage] = useState(0);
  const [hasPlayer1Played, setHasPlayer1Played] = useState(false);
  const [hasPlayerRevealed, setHasPlayerRevealed] = useState(false);
  const [contract, setContract] = useState(null);
  const [winnerName, setWinnerName] = useState("Unknown");

  const getDataFromContract = async () => {
    if (window.ethereum) {
      try {
        const provider = new Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);

        const signer = provider.getSigner();

        const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

        const contract = new ethers.Contract(contractAddress, CoinFlipContract, signer);
        setContract(contract);

        const account = await signer.getAddress();

        const player1 = await contract.player1();
        const player2 = await contract.player2();

        if (account === player1) {
          setPlayerNumber(1);
        } else if (account === player2) {
          setPlayerNumber(2);
        } else if (player1 === AddressZero) {
          setPlayerNumber(1);
        } else if (player2 === AddressZero) {
          setPlayerNumber(2);
        }

        const hasPlayer1Played = await contract.hasPlayer1Played();
        if (playerNumber === 1 && hasPlayer1Played) {
          setHasPlayer1Played(true);
        }

        const stage = await contract.currentStage();
        setCurrentStage(stage);

      } catch (error) {
        console.error('Error initializing contract:', error);
      }
    } else {
      console.error('Please install MetaMask!');
    }
  };

  useEffect(() => {
    const fetchPlayer1Status = async () => {
      if (!contract) return;
      const status = await contract.hasPlayer1Played();
      setHasPlayer1Played(status);
    };

    fetchPlayer1Status();
  }, [contract]);

  const revealResults = async () => {
    if (contract) {
      try {
        await contract.revealResults();
        const winner = await contract.winnerName();
        setWinnerName(winner);
      } catch (error) {
        console.error('Error revealing results:', error);
      }
    }
    setHasPlayerRevealed(true);
  };

  useEffect(() => {
    getDataFromContract();
  }, []);

  const getGameStatusMessage = () => {
    if (hasPlayerRevealed && currentStage === 1) {
      if (winnerName === `player${playerNumber}`) {
        return 'You Win!';
      } else if (winnerName === `player${playerNumber === 1 ? 2 : 1}`) {
        return 'You Lose!';
      }
    }

    if (currentStage === 0 && playerNumber === 1 && hasPlayer1Played) {
      return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
        <Button variant="outlined" onClick={getDataFromContract}>
          <RefreshCw/>
          Refresh
        </Button>
        <div>Waiting for Player 2 to bet</div>
      </div>
    }
    return null;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', padding: '100px' }}>
      <div style={{ position: 'absolute', top: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontSize: "50px" }}>Welcome to Flip</p>
        <p style={{ fontSize: "20px" }}>Place bets on the flip of a coin</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: "2px solid #244033", padding: "30px", width: "30%", minHeight: "40vh", borderRadius: "10px" }}>
        {playerNumber ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

            <p>You are Player : {playerNumber}</p>

            {currentStage === 1 && !hasPlayerRevealed && <Button onClick={revealResults}>Reveal Results</Button>}
            {currentStage === 0 && (playerNumber === 2 || (playerNumber === 1 && !hasPlayer1Played)) && <PlaceBet updateData={getDataFromContract} contract={contract} />}
            <div className='mt-4'>{getGameStatusMessage()}</div>
          </div>
        ) : (
          <Box sx={{ width: "100%" }}>
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
          </Box>
        )}
      </div>

    </div>
  );
}
