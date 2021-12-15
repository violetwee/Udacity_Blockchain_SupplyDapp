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

## Libraries:

- Truffle v5.4.23 (core: 5.4.23)
- Solidity - ^0.4.24 (solc-js)
- truffle-hdwallet-provider - ^1.0.17
- web3 - ^1.6.1
- Node v11.15.0
- Web3.js v1.5.3

Truffle, Solidity and web3 are used for smart contracts development. truffle-hdwallet-provider is used to interact with Infura. Node and Web3.js are used for front end.

## Smart Contract on Public Test Network (Rinkeby)

Contract Address:
0xB1f4097EDa09D876931134ee601b12D5DB3AaF3b

Txn Hash:
0xc496d7b89974e97bf1ca95e585e5c5021241c2969829d970849534e3acde55e5
