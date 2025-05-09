# Nemo: A 3D Open World Sandbox Game

Welcome to _Nemo_, a web-based 3D sandbox game where players can explore, build, collect, and trade in a dynamic world powered by smart contracts on the Polkadot ecosystem.

Built using _React Three Fiber_ for immersive 3D rendering and powered by _Polkadot's Westend Asset Hub_ and _PolkaVM, the game leverages Solidity smart contracts for game logic and ERC-1155 items. Metadata and web app deployment are handled via \*\*Appilon_.

---

## 🚀 Getting Started

To run the project locally:

bash
git clone https://github.com/your-repo/nemo
cd nemo
npm install
npm run start

## 🎮 Controls

Use the following keys and mouse actions to interact with the Nemo 3D sandbox world:

| Key / Input    | Action               |
| -------------- | -------------------- |
| W              | Forward              |
| A              | Leftward             |
| S              | Backward             |
| D              | Rightward            |
| Space          | Jump                 |
| Click          | Build Block          |
| Alt + Click    | Destroy Block        |
| C              | Open Chatbox         |
| Q              | Open Inventory       |
| E              | Open Settings        |
| B              | Buy Items            |
| I              | Open Inventory (Alt) |
| Mouse Movement | Look Around          |

> 💡 _Hint_: Use Click to place a block and Alt + Click to remove it. Inventory and purchase menus offer creative flexibility.

## 🧱 Game Features

- _Dynamic World_: Explore or edit a voxel-based sandbox environment.
- _Smart Contract Integration_: Every world and item is represented via a contract (ERC-1155).
- _Ownership & Trading_: Create and trade your in-game assets.
- _Metadata Storage_: All assets' data are hosted using Appilon.

### 📦 Smart Contracts

| Contract  | Description                          | Stack                           |
| --------- | ------------------------------------ | ------------------------------- |
| Nemo      | Manages the 3D sandbox world         | Solidity on PolkaVM             |
| NemoItems | Handles in-game items using ERC-1155 | OpenZeppelin, Westend Asset Hub |

---

### 🔗 Ecosystem Integration

| Component         | Role                                  |
| ----------------- | ------------------------------------- |
| React Three Fiber | Rendering 3D content on web           |
| PolkaVM           | Backend execution engine (RISC-V)     |
| Westend Asset Hub | Smart contract hosting (parachain)    |
| Appilon           | Metadata storage & web app deployment |

## 📄 License

MIT License. See LICENSE for details.

---

## 🙌 Contributing

We welcome contributions! Please open issues or submit PRs for improvements or bug fixes.

---

## ✨ Future Plans

- Multiplayer & Chat
- AI Helper for in-game tasks
- OpenSea Integration for World Viewing
- Smoother asset minting & editing UX

> Built with passion at Polkadot Scalability Hackathon 🚀
