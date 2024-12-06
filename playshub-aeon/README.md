# Playshub x AEON

- Playshub x AEON protocol integration. [aeon-docs](https://aeon-xyz.readme.io/docs/create-order-bot-telegram-cp)

![architecture](./figures/architecture.png)

1. The user checks in or makes in-game purchases.
2. Orders are processed, and a payment link is generated through the AEON payment protocol.
3. The user completes the transaction via the provided payment link.
4. Webhook statuses from the AEON payment protocol are received and processed.
5. Notifications are sent to update in-game workflows accordingly.
6. Tracking the transaction in here: Business Name: PLAYS Hub, Merchant ID: CPM202411071833

# Project Structure

```
playshub-blockchain/
├── src/
│   ├── migrations/
│   ├── modules/
│   │   ├── aeon/
│   │   ├── aeon-webhooks/
│   │   ├── check-in/
│   │   ├── notification/
│   │   ├── purchase/
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
- `modules/aeon`: API service for Aeon integrations
- `modules/aeon-webhooks`: Aeon webhooks listener
- `modules/check-in`: Check in module
- `modules/notification`: Send webhooks/websocket for playshub game
- `modules/purchase`: Purchase game item module
- `main.ts`: Entry point for the React application.

# Authors and acknowledgment

Playshub Team

# License

This project is licensed under the MIT License. See the LICENSE file for details.

# Project Information

📝 White Paper with full details: https://docs.playshub.io

🎮 Play on Telegram Bot: https://t.me/playshubbot

👨‍💻 Github: https://github.com/playshub/playshub-ton

💎 AEON Payment Integration: Business Name: PLAYS Hub, Merchant ID: CPM202411071833

▶️ AEON Payment Video Demo: https://youtube.com/shorts/W1QBfyMuEbo

🌐 Website: https://playshub.io

📢 Telegram Announcement: https://t.me/PlayshubAnn

💬 Telegram Community Chat: https://t.me/PlayshubChat

𝕏 X Channel: https://x.com/PlaysHub

📩 Contact to Team: https://t.me/lucasvux
