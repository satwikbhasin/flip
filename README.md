## FLIP - A Decentralized Coin Flip Betting App Built on Ethereum

### Overview
FLIP is a decentralized application (dApp) that allows users to bet on the flip of a coin. Built on the Ethereum blockchain, it ensures transparency and fairness in every bet.

### Features
- **Decentralized Betting:** Place bets on a simple coin flip with full transparency ensured by Ethereum smart contracts.
- **Secure and Fair:** Leveraging blockchain technology, every bet outcome is verifiable and immutable.

### Smart Contract Deployment
The smart contract that powers FLIP is located in the "Smart Contract" folder. Follow the steps below to compile and deploy it on a local Ethereum network using Truffle and Ganache:

1. **Compile the Smart Contract:**
   ```bash
   truffle compile
   ```

2. **Deploy the Smart Contract:**
   ```bash
   truffle migrate --network development
   ```

### Prerequisites
Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/)
- [Truffle](https://www.trufflesuite.com/truffle)
- [Ganache](https://www.trufflesuite.com/ganache)

### Setting Up Environment Variables
After deploying the smart contract, you'll need to create a local `.env` file in the root directory of this project so that our frontend can interact with our smart contract.
