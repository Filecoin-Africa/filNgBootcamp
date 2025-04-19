Project Title: OpenEdStore Decentralized Educational Storage Platform

Group Members: 


Names           GitHub Handles                  Emails
Beulah          @Beutife               udebeulah@gmail.com
Similoluwa      @Abidoyesimze          similoluwaeyitayoabidoye@gmail.com
Oluwatomiolola  @Oluwatomilola         tomilolaayeni97@gmail.com
Olaoluwa        @oluwasina97           oluwasinaolaoluwa16@gmail.com 

BRIEF DESCRIPTION
A decentralised application (dApp) that enables secure, scalable, and cost-effective storage of educational content, such as research papers, course materials, and administrative records—leveraging Filecoin's decentralised storage network, IPFS for content addressing, and FVM-based smart contracts for automated storage deal management.


LIVE DEMO lINK: 
https://www.loom.com/share/34abdcfeb9184d6ea12a22f7e879f283?sid=af00fb94-edb8-415b-bc9c-71d777a434d7

lINK TO HOSTED PROJECT: https://openedustore.netlify.app/

TECH STACK / TOOLS USED:
React Typescript, NodeJS, Solidity, FVM, LightHouse 


HOW TO RUN THE PROJECT LOCALLY:

Getting Started
Prerequisites
Node.js (v14 or later)
Yarn or npm
Hardhat (for smart contract development)
Metamask or any Web3-compatible wallet
Installation
Clone the repository:

git clone https://github.com/Abidoyesimze/EduStore
cd Edustore-Frontend
Install dependencies:

yarn install
# or
npm install
Configure environment variables:

Create a .env file in the root directory and add the necessary configurations:

VITE_IPFS_API_URL=your_ipfs_api_url
VITE_FILECOIN_API_URL=your_filecoin_api_url
VITE_CONTRACT_ADDRESS=your_smart_contract_address
Start the development server:

yarn run dev
# or
npm run dev
Usage
Upload Files: Users can upload educational materials through the dashboard. Files are added to IPFS, and a CID is generated.

Initiate Storage Deal: The platform automatically initiates a storage deal on the Filecoin network using the generated CID.

Access Control: Set permissions for each file to control who can view or edit the content.

Monitor Storage Deals: View the status of storage deals, including verification results and renewal schedules.

LMS SDK

OpenEdStore provides a Software Development Kit (SDK) to integrate decentralized storage functionality into Learning Management Systems (LMS).

![landingPage](https://github.com/user-attachments/assets/62ac67e5-77c1-4fe5-871f-4de5234d397b)
![edustore](https://github.com/user-attachments/assets/500fd785-32c6-40ef-93b5-0d3e5b796d08)



