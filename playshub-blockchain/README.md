# Playshub Blockchain

`playshub-blockchain` handle payment processor on TON and notification for other payment status. `playshub-blockchain` stack consists of:

- `postgres`: PostgreSQL server to store indexed data and perform queries.
- `indexer-worker`: TON Index worker to read and parse data via [TON API Center](https://toncenter.com/)
- `ws`: Provide websocket server for internal service listeners.

# Feature

- Handle TON payment for Playshub shop
- Send proceed TON payment events via websocket
- Support withdraw and deposit TON
- Further, Handle JETTON & NFT processing (Under development in `nft` branch)

# Technique

- Nestjs: Index work and parse TON transaction and express api server
- Postgres: PostgreSQL server to store transaction data and perform queries.
- Socket.io: Push payment transaction to game server
- TON client: Connect to TON HTTP API endpoint to get payment transaction

# How to run

## Running locally

- Prerequisite: `Docker` and `Docker Compose`. Install via [download link](https://docs.docker.com/compose/install/).

```shell
docker compose up -d --build

```

# Project Structure

```
playshub-blockchain/
├── src/
│   ├── migrations/
│   ├── modules/
│   │   ├── account-subscriber/
│   │   ├── account-transaction/
│   │   ├── hmac/
│   │   ├── notification/
│   │   ├── telegram-payment-subscriber/
│   │   ├── ton/
│   │   └── ton-wallet/
│   ├── utils/
│   ├── app.controller.ts
│   ├── app.module.ts
│   └── main.ts
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── package.json
└── README.md
```

- `src/`:` Contains the source code, including components and styles.
- `migrations/`: Contains database TypeORM migrations scripts
- `modules/account-subscriber`: Handle payment by TON
- `modules/account-transaction`: parse and aggregate TON transaction
- `modules/hmac`: HMAC authorize withdraw api for game server
- `modules/telegram-payment-subscriber`: Handle payment by Telegram stars
- `modules/notification`: Send `ws` or `webhook` for service listeners
- `modules/ton`: TON client
- `modules/ton-wallet`: TON wallet management (WalletV4R2, HighloadWallet) functionality
- `utils/`: Contains utility functions, classes, and other helper modules that are used throughout the project
- `main.ts`: Entry point for the React application.

# Authors and acknowledgment

Playshub Team

# License

This project is licensed under the MIT License. See the LICENSE file for details.

# Project status

We are still developing this project following the roadmap in here: https://playshub.io/
