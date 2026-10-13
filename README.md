# PatientChain: Blockchain Patient Management System

A decentralized web app for managing patient records on the Ethereum **Sepolia** testnet. Patients control who can see their medical history, doctors add diagnoses and prescriptions, and an admin registers users and monitors activity. Access rules are enforced by a Solidity smart contract, not by the website.

**Built with:** HTML, CSS, JavaScript, ethers.js, MetaMask, Solidity, Remix and the Sepolia testnet.

## Roles and actions

| Role | What they can do |
|---|---|
| **Admin** (the wallet that deployed the contract) | Register patients and doctors by wallet address. View system activity (registrations, access grants and revokes, records added). Cannot read patient records. |
| **Doctor** | Add diagnoses and prescriptions for a patient who has granted access. View that patient's records. Each record shows an integrity check (hash recomputed and compared with the stored hash). |
| **Patient** | View their own medical history. Grant or revoke a doctor's access at any time. |
| **Unregistered wallet** | No access. The admin must register the wallet first. |

## How it works

1. A user connects with **MetaMask**. The wallet address decides the role.
2. The admin registers doctors and patients in the contract.
3. A patient grants a doctor access with `grantAccess`.
4. The doctor adds records with `addRecord`. The contract stores the record, the doctor's address, a timestamp, and a `keccak256` hash of the text.
5. Reading records goes through `getRecords`, which only allows the patient or a doctor the patient approved.
6. Every action emits an event, which the admin page reads to build the activity log.

Actions that change data are transactions (MetaMask asks for confirmation and a little Sepolia ETH for gas). Viewing records is a free read call.

## Tech stack

| Layer | Tool | Purpose |
|---|---|---|
| Frontend | HTML, CSS, JavaScript | Role-based web interface, with no framework or backend |
| Blockchain library | ethers.js v5.7.2 (loaded from a CDN) | Talks to the smart contract from the browser |
| Wallet and signing | MetaMask | Login by wallet address, and signs every transaction |
| Smart contract | Solidity (`PatientSystem.sol`) | Roles, access control, records, and event logs |
| Compile and deploy | Remix IDE | Compiles the contract and deploys it to Sepolia |
| Network | Sepolia testnet | Free test blockchain (test ETH from a faucet) |
| Blockchain explorer | Sepolia Etherscan | Verifies transactions and finds the deployment block |

There is no backend server or database. All data and rules live in the smart contract, and the browser connects to it directly through MetaMask.

## Project structure

```
patient-chain/
├── index.html          # page layout
├── style.css           # styles
├── app.js              # MetaMask connection, contract calls, role panels
├── PatientSystem.sol   # smart contract
└── README.md
```

## Setup

### Prerequisites
- The [MetaMask](https://metamask.io) browser extension, set to the **Sepolia** network
- Three MetaMask accounts for testing (admin, doctor, patient)
- Free Sepolia test ETH for each account, from any Sepolia faucet
- A local web server (for example the VS Code **Live Server** extension)

### Steps
1. Open `PatientSystem.sol` in [Remix](https://remix.ethereum.org) and compile it.
2. Deploy it to Sepolia with **Injected Provider - MetaMask**. The deploying account becomes the admin.
3. In `app.js`, replace these with your own deployment:
   - `CONTRACT_ADDRESS`: the address of your deployed contract
   - `DEPLOY_BLOCK`: the block number of your contract creation transaction (find it on [Sepolia Etherscan](https://sepolia.etherscan.io))
4. Only if you modify the contract: replace `const ABI` with the new ABI (Remix > Solidity Compiler > copy ABI). It must come from the same contract version you deployed.
5. Serve the folder with a local server and open it in a browser with MetaMask.

> MetaMask needs the page served over `http://localhost`. Opening `index.html` by double-clicking will not work.

## Try the full flow

1. **Admin** account: register the doctor and patient wallet addresses.
2. **Patient** account: enter the doctor's address and click **Grant access**.
3. **Doctor** account: enter the patient's address, add a record, then view records.
4. **Patient** account: check that the record appears in the history.
5. **Admin** account: click **Refresh activity** to see the event log.
6. **Patient** account: revoke access, then try adding a record as the doctor. It should fail.

Switch accounts in MetaMask and reload the page each time.

## Known limitations

- **Privacy:** Sepolia is a public blockchain. The contract blocks everyone else from reading records through the app, but a technically skilled person could still read the raw contract storage or transaction data. Use fake data only.
- **For real use,** encrypt the record text in the browser before sending it, or store records off-chain (for example IPFS or a database) and keep only the hash and access rules on-chain.
- **Integrity check:** the text and its hash are stored together here, so the check is mainly a demonstration. It is much more meaningful when the data is stored off-chain.
- **Single admin:** one wallet is both the deployer and the admin. There is no way to transfer or share the role.
- **Activity log:** events are read in 9,000-block chunks from `DEPLOY_BLOCK`, so it gets slower as the chain grows.

## Future improvements

- Encrypt records, or move them off-chain with only hashes on-chain
- Admin role transfer and multiple admins
- Time-limited access and per-record-type permissions
- Emergency ("break-glass") access with logging
- Deploy the frontend to GitHub Pages or Netlify

## Disclaimer

This is a college project for learning purposes. It runs on a test network and is not suitable for real medical data.
