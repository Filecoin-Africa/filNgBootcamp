# 📛 FilRead – Decentralized Blogging Platform

## 🧑🏽‍💻 Group Members:
- drimes – [@drimescodes](https://github.com/drimescodes) – drimescodes@gmail.com  
- ayomisco -[@Ayomisco](https://github.com/Ayomisco) – fayomide324@gmail.com
- Simeth O. – [@simeth-sol](https://github.com/simeth-sol) – simoneth1996@gmail.com
- Collins – UI/UX Designer

---

## 📝 Short Description

**FilRead** is a decentralized blogging platform built on Filecoin and IPFS. It enables censorship-resistant content publishing with rich social interactions, real-time reading and writing analytics, and content monetization. With Web3 wallet authentication and secure smart contracts, users retain ownership of their data and media.

---

## 🌐 Live Demo Link

[https://fil-read.vercel.app](https://fil-read.vercel.app)

---

## 🔗 Hosted Project

- **Frontend**: Vercel  
- **Storage**: IPFS via Lighthouse  
- **Smart Contracts**: Deployed on FEVM (Filecoin EVM) calibrationnet testnet

---

## ⚙️ Tech Stack / Tools Used

### Frontend
- **Framework**: Next.js 14 + TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Routing**: Next.js App Router

### Blockchain
- **Smart Contracts**: Solidity (v0.8.x)
- **Wallet Integration**: Web3.js, Ethers.js, Rainbowkit
- **Network**: Filecoin Ehereum Virtual Machine (FEVM)
- **Storage**: IPFS via Lighthouse SDK

### DevOps & Tooling
- **Build**: Vite
- **Testing**: Jest, React Testing Library
- **Linting**: ESLint, Prettier
- **CI/CD**: GitHub Actions

---

## 🚀 How to Run the Project Locally

### Prerequisites
- Node.js (v18+)
- npm or yarn
- MetaMask or similar Web3 wallet
- Lighthouse API Keys

### Setup Steps

1. Clone the repository:
```bash
git clone https://github.com/drimescodes/FilRead.git

2. Install dependencies:
cd FilRead/frontend
npm install

3. Set up environment variables in frontend/.env.local:
NEXT_PUBLIC_LIGHTHOUSE_API_KEY=your_lighthouse_key

4. Start the development server:
npm run dev
