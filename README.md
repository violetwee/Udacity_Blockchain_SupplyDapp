# Ethereum Dapp for tracking items through Supply Chain

This is a demo dapp for tracking coffee beans through a supply chain.

## Stakeholders in this supply chain:

- Farmer
- Distributor
- Retailer
- Consumer

## Activity Flow & Access Control

| Action   | Stakeholder |
| -------- | ----------- |
| Harvest  | Farmer      |
| Process  | Farmer      |
| Pack     | Farmer      |
| Sell     | Farmer      |
| Buy      | Distributor |
| Ship     | Distributor |
| Receive  | Retailer    |
| Purchase | Consumer    |

Refer to the UML diagrams for more information.

# Getting Started

## Prerequisites

Please make sure that you have installed ganache-cli, Truffle and enabled MetaMask extension in your browser. You will also need an account on Infura.

| Name        | Link                                    |
| ----------- | --------------------------------------- |
| ganache-cli | https://github.com/trufflesuite/ganache |
| Truffle     | https://trufflesuite.com/               |
| MetaMask    | https://metamask.io/                    |
| Infura      | https://infura.io/                      |

### MetaMask

Switch to Rinkeby Test Network and create 4 accounts, one for each stakeholder.
To get some ether for testing, go to https://faucets.chain.link/rinkeby.

### Infura

To deploy to the Rinkeby Test Network, create a new project and replace the infuraKey value in truffle.js with your project id. You can find your Infura project's project id in Settings. Make sure that the Endpoint selected is Rinkeby.

## Installing

Clone this repository:

```sh
git clone https://github.com/violetwee/Udacity_Blockchain_SupplyDapp.git
```

Change directory to Udacity_Blockchain_SupplyDapp folder and install all required npm packages (as listed in package.json):

```sh
cd Udacity_Blockchain_SupplyDapp
npm install
```

Launch Ganache:

```sh
ganache-cli -m <your seed phrase>
```

In a separate terminal window, run

```sh
truffle compile
```

This will compile the smart contracts.

To test the smart contracts, run

```sh
truffle test
```

<img src="https://github.com/violetwee/Udacity_Blockchain_SupplyDapp/blob/main/Screenshots/truffle-test.png" width="800px" height="auto"/>

To deploy to Rinkeby Test Network:

```sh
truffle migrate --network rinkeby
```

<img src="https://github.com/violetwee/Udacity_Blockchain_SupplyDapp/blob/main/Screenshots/truffle-migrate.png" width="800px" height="auto"/>

To launch the Dapp's front end (web interface), in a separate terminal, run

```sh
npm run dev
```

<img src="https://github.com/violetwee/Udacity_Blockchain_SupplyDapp/blob/main/Screenshots/front-end.png" width="800px" height="auto"/>

Enter the Farmer ID, Distributor ID, Retailer ID and Consumer ID (Use the accounts from your MetaMask). Ensure the accounts are for the Rinkeby Test Network.

## Libraries & Versions:

- Truffle v5.4.23 (core: 5.4.23)
- Solidity ^0.4.24 (solc-js)
- truffle-hdwallet-provider ^1.0.17
- web3 ^1.6.1
- Node v11.15.0
- Web3.js v1.5.3

Truffle, Solidity and web3 are used for smart contracts development. truffle-hdwallet-provider is used to interact with Infura. Node and Web3.js are used for front end.

## Smart Contract on Public Test Network (Rinkeby)

Contract Address:
0xB1f4097EDa09D876931134ee601b12D5DB3AaF3b

Txn Hash:
0xc496d7b89974e97bf1ca95e585e5c5021241c2969829d970849534e3acde55e5

Rinkeby Etherscan:
https://rinkeby.etherscan.io/
