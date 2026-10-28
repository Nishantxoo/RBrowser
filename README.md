# RBrowser

**A personal desktop browser prototype powered by self-hosted metasearch.**

RBrowser is a learning project exploring desktop application development, self-hosted web search, and interface customization.

## Features

- Self-hosted metasearch using SearXNG
- Docker Compose setup with Redis
- Custom RBrowser search homepage and branding
- Electron-based desktop browser prototype

## Tech Stack

- **Desktop app:** Electron, JavaScript, HTML, CSS
- **Search engine:** SearXNG
- **Supporting service:** Redis
- **Containers:** Docker and Docker Compose

## Getting Started

1. Install Docker Desktop and Node.js.
2. Configure SearXNG locally using your own `searxng/settings.yml`.
3. Start the search services from the project root:

   ```powershell
   docker compose up -d
   ```

4. Open `http://localhost:8080` to test the search interface.
5. Start the desktop app:

   ```powershell
   cd desktop
   npm install
   npm start
   ```

## Security

The local `searxng/settings.yml` is excluded from version control because it may contain a secret key. Never publish private keys or credentials.

## Project Status

Under development. Features and interface details may change as development continues.