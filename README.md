<p align="center">
  <img src="creative-vault-frontend/src/pmlogo-2.png" alt="ProofMint Logo" width="200"/>
</p>

<h1 align="center">Proof Mint - Securing Creativity with Technology</h1>

Proof Mint is a decentralized, AI-powered proof-of-authorship engine that allows innovators to permanently timestamp and protect their creative ideas on the **Internet Computer (ICP)** blockchain. From text and code to sketches and startup concepts—users can safeguard their originality with a soulbound NFT minted only after a semantic originality check.

---

## Features

- **AI Originality Engine**: On-chain NLP embeddings + cosine similarity to detect plagiarism—even reworded concepts.
- **Encrypted Vault**: Your submissions are securely stored in tamper-proof Internet Computer canisters.
- **Soulbound NFTs**: Once verified, a soulbound NFT is minted as permanent proof of authorship (DIP-721 compliant).
- **DAO Moderation**: Community governance to resolve disputes, approve flagged content, and maintain trust.
- **Trust Score System**: Prevents spamming or misuse with reputation-based access control.
- **Internet Identity Auth**: Seamless Web3 login with Internet Identity.

---

## Project Structure

### creative-vault-frontend
Contains the React-based frontend built with Vite. Includes pages, components, styling, and integration with canisters.

### creative-vault-ic (Under Development)
Houses the backend canisters deployed to the Internet Computer. This includes:

- `ai.ts`: Logic for NLP-based similarity detection  
- `nft.ts`: DIP-721 soulbound NFT minting  
- `dao.ts`: DAO governance system  
- `storage.ts`: Secure storage for submissions  
- `backend.did`: Candid interface file  
- `dfx.json`: Canister configuration file  

---

## Installation

### Backend Setup

1. Install [DFX SDK](https://internetcomputer.org/docs/current/developer-docs/build/sdk/quickstart).

2. Start the local replica:
   ```bash
   dfx start --background
   
3. Deploy the backend:
    ```bash
    cd creative-vault-ic
    dfx deploy

### Frontend Setup

1. Navigate to the frontend folder:
    ```bash
    cd creative-vault-frontend

2. Install dependencies:
    ```bash
   npm install

3. Run the app:
    ```bash
    npm run dev

---

## Tech Stack

- NLP Embeddings: MiniLM / BERT (for semantic matching)  
- Fullstack: Internet Computer Protocol (ICP)  
- NFT Minting: DIP-721 soulbound tokens  
- UI: React + Vite  
- Auth: Internet Identity  
- Hosting & Execution: WebAssembly canisters (WASM)

---

## Use Cases

- Artists protecting drafts or visual art  
- Startup founders safeguarding pitch decks  
- Developers proving original code snippets  
- Hackathon teams timestamping project originality  
- Researchers avoiding scooping of new ideas  

---

## Future Additions

- Support for voice and image embeddings  
- NFT-linked royalty smart contracts  
- AI-based collaboration engine for creators  
- Legal filing export to copyright/patent systems  
- Idea leaderboard and community badges

---

## Contributors

- **Shambhavi Raj** – Frontend Development, Blockchain Canisters, Internet Identity, Deployment  
- **Shardul Bangale** – Frontend Development, DAO Backend Logic, Canister Implementation  
- **Arya Kuwar** – Backend Development, Soulbound NFT Minting (DIP-721)  
- **Sarthak Patil** – DAO Backend logic, Deployment
- **Shravya Bhandary** – Backend Development, Documentation

---

## License

This project is licensed under the [MIT License](LICENSE).
