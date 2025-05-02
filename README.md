# UI Report Chrome Extension

A Chrome extension that helps identify and report broken buttons on webpages. This extension highlights all buttons and links on a page, allows users to flag problematic ones, and stores reports in a Supabase database.

## Features

- 🔍 Highlights all buttons and links on any webpage
- 🚩 Allows flagging problematic buttons with custom notes
- 📊 Popup interface to view recent reports
- 💾 Stores reports in Supabase database
- 🔄 Works with dynamic content.

## Project Structure

### Chrome Extension (This Repository)

- Content Script: Injects into webpages to highlight and enable flagging of buttons
- Popup: TypeScript-based interface showing recent reports
- Background Script: Handles communication with the backend API
- Modular Architecture: Follows SOLID principles with specialized classes for UI, reporting, and text extraction

### Backend (Separate Next.js Project)

The backend should be implemented as a separate Next.js application that:
- Provides API endpoints for submitting and retrieving reports
- Connects to Supabase for data storage
- Implements an admin dashboard for managing reports

## Admin Dashboard

The admin dashboard is available at the root URL (`/`) and provides:
- A list of all button reports
- Filtering by status
- Ability to mark reports as read/unread/archived
- Detailed view of each report


## Development Setup

### Prerequisites

- Node.js and npm
- Chrome browser
- Docker (optional, for build commands)

### Setting up the Next.js Backend

1. Clone Repo
   ```
   git clone https://github.com/mohamedjs/ui-report-system.git
   ```
2. Navigate to the `ui-report-system` directory
3. Install dependencies:
   ```
   npm install
   ```
   or with legacy peer dependencies:
   ```
   npm install --legacy-peer-deps
   ```
4. Start the development server on port 3002:
   ```
   npm run dev -- -p 3002
   ```
   
   Alternatively, you can use Docker Compose:
   ```
   docker compose up
   ```
5. The backend API will be available at `http://localhost:3002`

### Building and Loading the Chrome Extension

1. Navigate to the `Extensions` directory
2. Install dependencies:
   ```
   npm install
   ```
3. Build the extension using webpack:
   ```
   npm run build
   ```
4. Open Chrome and navigate to `chrome://extensions/`
5. Enable "Developer mode" by toggling the switch in the top right corner
6. Click "Load unpacked" and select the `dist` folder from the `Extensions` directory
7. The extension should now appear in your extensions list and be ready to use