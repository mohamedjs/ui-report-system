#!/bin/sh
# Install dependencies inside the container
npm install -frozen-lockfile --legacy-peer-deps


# Start the application
npm run dev -- -p 5000