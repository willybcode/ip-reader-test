# IP Reader Test

This project is a minimal Node.js/Express server designed specifically to help you understand which IP address Express (and especially the `express-rate-limit` middleware) sees for incoming requests. This is useful for diagnosing how your proxy or load balancer is forwarding requests and for tuning Express's trust proxy settings.

## Purpose
- **Proxy Diagnostics**: By observing which IP the server and rate limiter detect, you can determine how your proxy (e.g., Nginx, HAProxy, cloud load balancer) is forwarding client IPs.
- **Trust Proxy Tuning**: Change the `TRUST_PROXY_COUNT` environment variable to see how Express's `trust proxy` setting affects the IP address seen by the app and the rate limiter.
- **Server Identification**: Set the `SERVER_SOURCE` environment variable so you know which backend server you are hitting (helpful when testing with multiple servers or in a load-balanced environment).

## How it Works
- The root endpoint (`/`) and all `/test...` endpoints log and return various IP-related values, including what Express and `express-rate-limit` see as the client's IP.
- **All `/test...` endpoints are rate-limited**: 5 requests per IP per minute (using `express-rate-limit`).
- You can send requests (direct, via proxy, etc.) and observe the results. Adjust `TRUST_PROXY_COUNT` and compare the output.

## Usage

### Local Development
1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the server:**
   ```bash
   npm start
   ```
   The server runs on port `3333` by default (can be changed with `APP_PORT` in `.env`).

### Docker
1. **Build the image:**
   ```bash
   docker build -t ip-reader-test .
   ```
2. **Run the container:**
   ```bash
   docker run -p 3333:3333 --env-file .env ip-reader-test
   ```

## Environment Variables
- `APP_PORT`: Port to run the server (default: 3333)
- `TRUST_PROXY_COUNT`: Number of proxies to trust (default: 1). Change this to see how it affects IP detection.
- `SERVER_SOURCE`: Optional string to identify which server is responding (useful for multi-server testing).

## Endpoints

- `/` (GET): Returns and logs detected IP info and headers.
- `/test` (GET): Basic test endpoint. **Rate-limited (5 req/IP/min)**
- `/test/:id` (GET): Returns the provided ID. **Rate-limited (5 req/IP/min)**
- `/test/limited` (GET): Rate-limited endpoint, also returns/logs IP info. **Rate-limited (5 req/IP/min)**

## Project Structure
```
├── controllers/         # (Controller logic, if any)
├── middlewares/         # Custom middleware (e.g., limiter)
├── routes/              # Express route handlers
├── index.js             # Main server entry point
├── .env                 # Environment variables
├── Dockerfile           # Docker support
├── package.json         # NPM dependencies/scripts
└── README.md            # Project documentation

## License
ISC

---
Use this tool to experiment with proxy setups and understand how Express interprets client IPs under different configurations.
