# HRM Assessment Project

A simple Human Resource Management system with employee management and leave request functionality.

## Project Structure

```
phanvucongthanh-hrm-assessment/
├── backend/                 # Backend API (Node.js + Express)
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   └── utils/          # Helper functions
│   ├── package.json
│   └── server.js
└── frontend/               # Frontend (HTML, CSS, JavaScript)
    ├── css/
    ├── js/
    └── index.html
```

## Getting Started

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   npm start
   ```

   The backend server will run on `http://localhost:8080`

   **Alternative:** For development with auto-restart:

   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Open the `index.html` file in your web browser:

   - **Option 1:** Double-click the `index.html` file
   - **Option 2:** Right-click and select "Open with" → your preferred browser
   - **Option 3:** Use a local server (recommended):

     ```bash
     # If you have Python installed
     python -m http.server 3000

     # Or if you have Node.js installed globally
     npx http-server -p 3000
     ```

   The frontend will be accessible at `http://localhost:3000` (if using local server)

## API Documentation

The backend provides RESTful APIs for employee management and leave requests.

### Base URL

```
http://localhost:8080/api
```

### Employees API

#### Get All Employees

```http
GET /api/employees
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Jane Smith",
      "department": "Marketing",
      "leaveBalance": 10
    }
  ]
}
```

#### Create Employee

```http
POST /api/employees
Content-Type: application/json

{
  "name": "Jane Smith",
  "department": "Marketing",
  "leaveBalance": 10
}
```

#### Get Employee by ID

```http
GET /api/employees/:id
```

#### Delete Employee

```http
DELETE /api/employees/:id
```

### Leave Requests API

#### Get All Leave Requests

```http
GET /api/leave
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "employeeId": 1,
      "startDate": "2023-12-01",
      "endDate": "2023-12-05",
      "reason": "Vacation",
    }
  ]
}
```

#### Create Leave Request

```http
POST /api/leave
Content-Type: application/json

{
  "employeeId": 1,
  "startDate": "2023-12-01",
  "endDate": "2023-12-05",
  "reason": "Vacation"
}
```

#### Approve Leave Request

```http
PATCH /api/leave/:id/approve
```

## Example API Usage

### Using cURL

1. **Get all employees:**

   ```bash
   curl -X GET http://localhost:8080/api/employees
   ```

2. **Create a new employee:**

   ```bash
   curl -X POST http://localhost:8080/api/employees \
     -H "Content-Type: application/json" \
     -d '{
          "name": "Jane Smith",
          "department": "Marketing",
          "leaveBalance": 10
       }'
   ```

3. **Create a leave request:**

   ```bash
   curl -X POST http://localhost:8080/api/leave \
     -H "Content-Type: application/json" \
     -d '{
       "employeeId": 1,
       "startDate": "2023-12-15",
       "endDate": "2023-12-20",
       "reason": "Annual leave"
     }'
   ```

4. **Approve a leave request:**
   ```bash
   curl -X PATCH http://localhost:8080/api/leave/1/approve
   ```

### Using JavaScript (Frontend)

```javascript
// Get all employees
const employees = await fetch("http://localhost:8080/api/employees").then(
  (response) => response.json(),
)

// Create new employee
const newEmployee = await fetch("http://localhost:8080/api/employees", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
  "name": "Jane Smith",
  "department": "Marketing",
  "leaveBalance": 10
}),
}).then((response) => response.json())

// Create leave request
const leaveRequest = await fetch("http://localhost:8080/api/leave", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    employeeId: 1,
    startDate: "2023-12-25",
    endDate: "2023-12-31",
    reason: "Holiday vacation",
  }),
}).then((response) => response.json())
```

## Features

- **Employee Management:** Create, view, and delete employees
- **Leave Request System:** Submit and approve leave requests
- **RESTful API:** Clean and documented API endpoints
- **Responsive Frontend:** Simple web interface for managing HRM tasks
- **CORS Enabled:** Frontend can communicate with backend from different origins

## Technologies Used

### Backend

- Node.js
- Express.js
- CORS middleware
- Helmet (security)
- Morgan (logging)
- Compression

### Frontend

- HTML5
- CSS3
- Vanilla JavaScript
- Fetch API for HTTP requests

## Development

### Backend Development Mode

```bash
cd backend
npm run dev
```

This uses nodemon for automatic server restart on file changes.

### Testing

```bash
cd backend
npm test
```

## Notes

- The backend uses in-memory storage (no database) for simplicity
- Data will be reset when the server restarts
- The frontend is designed to work with the backend API
- Make sure the backend is running before using the frontend

## Author

Phan Vu Cong Thanh
