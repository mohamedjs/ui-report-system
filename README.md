
# Button Watcher Backend

This is the Next.js backend for the Button Watcher Chrome extension. It provides API endpoints for storing and retrieving button reports, as well as an admin dashboard to view and manage reports.

## Getting Started

### Prerequisites

- Node.js 18+
- Docker and Docker Compose (for containerized setup)

### Development Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   Copy the `.env.example` file to `.env.local` and fill in your Supabase credentials:
   ```bash
   cp .env.example .env.local
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the admin dashboard.

### Docker Setup

1. Build and start the Docker containers:
   ```bash
   docker-compose up -d
   ```

2. The app will be available at [http://localhost:3000](http://localhost:3000).

## API Endpoints

### GET /api/reports

Fetch a list of button reports.

Query parameters:
- `limit` (optional): Maximum number of reports to return (default: 10)
- `status` (optional): Filter by status ("read", "unread", "archived")

### POST /api/reports

Submit a new button report.

Request body:
```json
{
  "url": "https://example.com",
  "text": "Button text",
  "note": "User's note about the issue",
  "timestamp": "2023-05-01T12:34:56Z"
}
```

### PATCH /api/reports/:id

Update a report status.

Request body:
```json
{
  "status": "read" // or "unread", "archived"
}
```

## Admin Dashboard

The admin dashboard is available at the root URL (`/`) and provides:
- A list of all button reports
- Filtering by status
- Ability to mark reports as read/unread/archived
- Detailed view of each report
