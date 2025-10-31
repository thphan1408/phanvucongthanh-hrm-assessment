# HRM Assessment - Backend API

A RESTful API for managing employees and leave requests built with Node.js and Express.js.

## 🚀 Features

- **Employee Management**: Create, read, update, and delete employees
- **Leave Request Management**: Create and manage employee leave requests
- **Automatic Leave Balance**: Automatically deduct leave balance when requests are created
- **Leave Approval System**: Approve leave requests with status tracking
- **In-Memory Storage**: Fast, lightweight data storage for development/testing
- **Comprehensive Validation**: Input validation and business rule enforcement
- **Error Handling**: Robust error handling with appropriate HTTP status codes

## 📋 Requirements Met

✅ **All Core Requirements:**

- Express.js REST API
- Employee endpoints (GET, POST, GET/:id, DELETE/:id)
- Leave request endpoints (POST, GET)
- Leave balance management
- In-memory data storage
- Proper HTTP status codes (200, 201, 400, 404)

✅ **Bonus Features:**

- Leave request approval endpoint (PATCH /leave/:id/approve)
- Advanced validation (negative balance prevention)
- Status tracking system

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Security**: Helmet.js
- **Logging**: Morgan
- **Compression**: Compression middleware
- **Architecture**: MVC Pattern with Utils

## 📁 Project Structure

```
backend/
├── src/
│   ├── app.js                 # Express app configuration
│   ├── server.js              # Server startup
│   ├── controllers/           # Request handlers
│   │   ├── employees.controller.js
│   │   └── leave-requests.controller.js
│   ├── services/             # Business logic
│   │   ├── employees.service.js
│   │   └── leave-requests.service.js
│   ├── routes/               # API routes
│   │   ├── root.routes.js
│   │   ├── employees.routes.js
│   │   └── leave-requests.routes.js
│   └── utils/                # Utility functions
│       ├── commonUtils.js    # General utilities
│       ├── dateUtils.js      # Date validation utilities
│       └── responseUtils.js  # Response formatting utilities
├── package.json
└── README.md
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the server**

   ```bash
   npm start
   ```

3. **For development with auto-reload**
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:8080`

## 📚 API Documentation

### Base URL

```
http://localhost:8080/api
```

### Employee Endpoints

#### Get All Employees

```http
GET /api/employees
```

**Response:**

```json
{
  "code": 200,
  "message": "Employees retrieved successfully",
  "data": [
    {
      "id": "1730390400123",
      "name": "John Doe",
      "department": "IT",
      "leaveBalance": 10
    }
  ]
}
```

#### Create Employee

```http
POST /api/employees
```

**Request Body:**

```json
{
  "name": "John Doe",
  "department": "IT",
  "leaveBalance": 10
}
```

**Response:**

```json
{
  "code": 201,
  "message": "Employee created successfully",
  "data": {
    "id": "1730390400123",
    "name": "John Doe",
    "department": "IT",
    "leaveBalance": 10
  }
}
```

#### Get Employee by ID

```http
GET /api/employees/:id
```

**Response:**

```json
{
  "code": 200,
  "message": "Employee retrieved successfully",
  "data": {
    "id": "1730390400123",
    "name": "John Doe",
    "department": "IT",
    "leaveBalance": 10
  }
}
```

#### Delete Employee

```http
DELETE /api/employees/:id
```

**Response:**

```json
{
  "code": 200,
  "message": "Employee deleted successfully"
}
```

### Leave Request Endpoints

#### Get All Leave Requests

```http
GET /api/leave
```

**Response:**

```json
{
  "code": 200,
  "message": "Leave requests retrieved successfully",
  "data": [
    {
      "id": "1730390400124",
      "employeeId": "1730390400123",
      "startDate": "2025-11-01",
      "endDate": "2025-11-03",
      "reason": "Personal leave",
      "status": "pending",
      "createdAt": "2025-10-31T10:30:00.000Z"
    }
  ]
}
```

#### Create Leave Request

```http
POST /api/leave
```

**Request Body:**

```json
{
  "employeeId": "1730390400123",
  "startDate": "2025-11-01",
  "endDate": "2025-11-03",
  "reason": "Personal leave"
}
```

**Response:**

```json
{
  "code": 201,
  "message": "Leave request created successfully",
  "data": {
    "id": "1730390400124",
    "employeeId": "1730390400123",
    "startDate": "2025-11-01",
    "endDate": "2025-11-03",
    "reason": "Personal leave",
    "status": "pending",
    "createdAt": "2025-10-31T10:30:00.000Z"
  }
}
```

#### Approve Leave Request

```http
PATCH /api/leave/:id/approve
```

**Response:**

```json
{
  "code": 200,
  "message": "Leave request approved successfully",
  "data": {
    "id": "1730390400124",
    "employeeId": "1730390400123",
    "startDate": "2025-11-01",
    "endDate": "2025-11-03",
    "reason": "Personal leave",
    "status": "approved",
    "createdAt": "2025-10-31T10:30:00.000Z",
    "approvedAt": "2025-10-31T11:00:00.000Z"
  }
}
```

## ✅ Validation Rules

### Employee Validation

- **name**: Required, string, trimmed
- **department**: Required, string, trimmed
- **leaveBalance**: Required, number, cannot be negative

### Leave Request Validation

- **employeeId**: Required, must exist in employees
- **startDate**: Required, valid date format, cannot be in the past
- **endDate**: Required, valid date format, must be >= startDate
- **reason**: Required, string, trimmed
- **Employee must have leave balance > 0**

## 🚨 Error Responses

### 400 Bad Request

```json
{
  "code": 400,
  "message": "Missing required fields: name, department, leaveBalance"
}
```

### 404 Not Found

```json
{
  "code": 404,
  "message": "Employee not found"
}
```

## 🧪 Testing

### Manual Testing with cURL

**Create an employee:**

```bash
curl -X POST http://localhost:8080/api/employees \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "department": "IT",
    "leaveBalance": 10
  }'
```

**Create a leave request:**

```bash
curl -X POST http://localhost:8080/api/leave \
  -H "Content-Type: application/json" \
  -d '{
    "employeeId": "1730390400123",
    "startDate": "2025-11-01",
    "endDate": "2025-11-03",
    "reason": "Personal leave"
  }'
```

### Using Postman

1. Import the API endpoints
2. Set base URL to `http://localhost:8080/api`
3. Test all endpoints with sample data

## 🏗️ Architecture

### Design Patterns

- **MVC Pattern**: Clear separation of concerns
- **Service Layer**: Business logic isolation
- **Utility Pattern**: Reusable helper functions

### Data Flow

```
Request → Routes → Controllers → Services → Utils
                ↓
Response ← Controllers ← Services ← Utils
```

## 🛡️ Security Features

- **Helmet.js**: Security headers
- **Input Validation**: Comprehensive data validation
- **Error Handling**: Safe error messages
- **Data Sanitization**: Input trimming and normalization

## 📊 Performance Features

- **Compression**: Response compression middleware
- **In-Memory Storage**: Fast data access
- **Efficient Algorithms**: Optimized data operations
- **Clean Code**: Maintainable and scalable

## 🔧 Configuration

### Environment Variables

```bash
PORT=8080  # Server port (default: 8080)
```

### Package.json Scripts

```json
{
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

## 📦 Project Delivery

This project is delivered as a zip file containing:

- Complete source code
- Documentation
- All necessary configuration files
- Ready-to-run implementation

Simply extract and follow the installation steps above.

## 📝 License

This project is licensed under the MIT License.

## 👤 Author

**PhanVuCongThanh**

- Assessment project for HRM system

## 🙏 Acknowledgments

- Express.js team for the excellent framework
- Node.js community for the ecosystem
- All contributors to the dependencies used

---

**Built with ❤️ using Node.js and Express.js**
