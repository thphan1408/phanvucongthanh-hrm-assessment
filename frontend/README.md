# HRM Frontend

Frontend application for HRM (Human Resource Management) system built with vanilla HTML, CSS, and JavaScript using **Fetch API**.

## Project Structure

```
frontend/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All CSS styles
└── js/
    ├── config.js       # API configuration
    ├── utils.js        # Utility functions (validation, formatting)
    ├── api.js          # Generic API calls using Fetch
    ├── employee.js     # Employee-specific functions
    ├── leave.js        # Leave request-specific functions
    └── app.js          # Main application initialization
```

## Backend API Endpoints

Base URL: `http://localhost:8080/api`

### Employee Endpoints:

- `GET /employees` → Get all employees
- `POST /employees` → Create new employee (name, department, leaveBalance)
- `GET /employees/:id` → Get single employee by ID
- `DELETE /employees/:id` → Delete employee by ID

### Leave Request Endpoints:

- `POST /leave` → Create leave request (employeeId, startDate, endDate, reason)
- `GET /leave` → Get all leave requests
- `PATCH /leave/:id/approve` → Approve leave request

## Features Implemented

✅ **Add Employee Form** - Name, Department, Leave Balance  
✅ **View All Employees** - Table with ID, Name, Department, Leave Balance  
✅ **Create Leave Request Form** - Employee ID, Start/End Date, Reason  
✅ **View All Leave Requests** - Table with all details + Status column  
✅ **Clean CSS UI** - Responsive design with professional styling  
✅ **Form Validation** - Client-side validation  
✅ **Status Display** - Approved/Pending badges with colors

## File Descriptions

- **config.js**: API base URL and endpoints configuration
- **utils.js**: Reusable functions (validation, date formatting, messages)
- **api.js**: Generic fetch API wrapper for HTTP requests
- **employee.js**: All employee-related functions (API calls + UI)
- **leave.js**: All leave request functions (API calls + UI)
- **app.js**: Application initialization and form setup

## Getting Started

1. Make sure your backend is running on `http://localhost:8080`
2. Open `index.html` in your browser
3. All functions are ready to use!

## Architecture Benefits

- **Simple & Clean**: No unnecessary abstraction
- **Functional Programming**: Pure functions, easy to test
- **Separation of Concerns**: Each file has a single responsibility
- **No External Dependencies**: Pure vanilla JavaScript with Fetch API
