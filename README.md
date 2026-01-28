# Live Bidding Platform

A real-time auction platform where users compete to buy items in the final seconds. Built with **Node.js**, **Socket.io**, and **React**.

## Features

- **Real-Time Bidding**: Bids are broadcasted instantly to all connected clients.
- **Race Condition Handling**: Server validates bids to prevent conflicts (e.g., two users bidding the same amount simultaneously).
- **Live Countdown Timer**: Synced with the server to ensure fairness.
- **Visual Feedback**:
  - **Green Flash**: When a new bid occurs.
  - **"Winning" Badge**: For the current highest bidder.
  - **"Outbid" State**: Visual alert when you are outbid.
- **Dockerized**: Easy setup with Docker Compose.

## Tech Stack

- **Backend**: Node.js, Express, Socket.io
- **Frontend**: React, Vite, Tailwind CSS
- **Infrastructure**: Docker, Docker Compose

## Getting Started

### Prerequisites

- Node.js (v18+)
- Docker (optional, but recommended)

### Run with Docker (Recommended)

1. Clone the repository.
2. Run the following command in the root directory:
   ```bash
   docker-compose up --build
   ```
3. Open `http://localhost:3000` in your browser.

### Run Locally

#### Backend
```bash
cd backend
npm install
npm start
```
Server runs on `http://localhost:5000`.

#### Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`.

## Deployment

This project is ready for deployment on **Render**.

- **Backend**: Deploy as a Web Service.
- **Frontend**: Deploy as a Static Site.

See [DEPLOY.md](DEPLOY.md) (if available) or check the deployment section in the documentation for details.

## API Endpoints

- `GET /items`: Fetch all auction items.
- **Socket Events**:
  - `BID_PLACED`: Client sends a bid.
  - `UPDATE_BID`: Server broadcasts new highest bid.
  - `BID_ERROR`: Server sends error (e.g., outbid, auction ended).
