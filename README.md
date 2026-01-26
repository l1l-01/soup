# Soup
soup is an experimental user-event recorder.

> [!WARNING]
> **Under active development**. This is a learning project exploring browser APIs, event processing, and modern web architecture.

## Architecture
- **Proxy (Express.js)**: Serves HTML frontend and embeds the tracker script
- **Event-Tracker (Vanilla JavaScript)**: Client-side library capturing user interactions
- **Event-Processor (rust)**: Backend API for data ingestion and processing

## Core Technical Learnings:
- **JavaScript Fundamentals**: Object references vs copies, event loop, browser APIs
- **Browser Events**: mousemove, scroll, touchmove...
- **Network Reliability**: fetch() vs sendBeacon()
- **Performance Optimization**: Throttling, batching, and memory management

## Why "Soup" ?
Because like a good soup, this project: Mixes multiple ingredients.

> [!IMPORTANT]
> **Important Note**: Currently, you need to manually copy event-tracker/main.js to proxy/public/ for the proxy to serve the latest tracking script. This will be automated in future versions.
