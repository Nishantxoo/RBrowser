# SearchX — Private Search

A locally hosted, privacy-focused metasearch engine built with SearXNG, Docker Compose, and Redis.

## Overview

SearchX provides a personal search interface that aggregates results from supported search engines without requiring a conventional centralized search account.

## Features

- Local web interface at `http://localhost:8080`
- Search across supported search providers
- Docker-based deployment
- Redis service for backend caching support
- Configurable SafeSearch
- Custom instance name and secret key

## Tech Stack

- SearXNG — metasearch engine
- Docker and Docker Compose — containerization
- Redis — supporting backend service
- YAML — service and application configuration

## Getting Started

### Prerequisites

- Docker Desktop
- Docker Compose

### Run locally

Clone or download this project, open a terminal in the project directory, and run:

```powershell
docker compose up -d
docker compose ps
```

Open `http://localhost:8080` in your browser.

### Stop the services

```powershell
docker compose down
```

## Architecture

Browser → SearXNG web application → supported search providers

SearXNG also connects to the Redis service defined in the Docker Compose configuration.

## Current Scope

SearchX is a self-hosted metasearch application. It aggregates results from existing search providers rather than crawling and maintaining its own web index.

## Future Improvements

- Customize the interface and branding
- Improve configuration and service security
- Add health checks and deployment documentation
- Add automated tests and CI checks
- Document performance and search-provider reliability

## Learning Outcomes

- Containerizing a multi-service application
- Configuring Docker Compose networking
- Managing application settings with YAML
- Debugging container logs and service startup
- Understanding metasearch architecture
