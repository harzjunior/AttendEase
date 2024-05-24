# AttendEase

AttendEase is a comprehensive attendance management application built with modern web technologies. It leverages Next.js for the frontend, Tailwind CSS for styling, and Drizzle ORM for database operations.

## Table of Contents

- [AttendEase](#attendease)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Database Setup](#database-setup)
  - [Usage](#usage)
    - [Development Server](#development-server)
    - [Building for Production](#building-for-production)
  - [Configuration](#configuration)
    - [Tailwind CSS](#tailwind-css)
    - [Drizzle ORM](#drizzle-orm)
    - [Middleware](#middleware)
    - [Utility Functions](#utility-functions)
  - [APIs](#apis)
    - [Authentication API](#authentication-api)
    - [Student API](#student-api)
    - [Grade API](#grade-api)
  - [Components](#components)
    - [react-hook-form](#react-hook-form)
    - [axios](#axios)
    - [ag-grid-react](#ag-grid-react)
  - [Sample Data](#sample-data)
  - [Scripts](#scripts)
  - [Technologies Used](#technologies-used)
  - [License](#license)
    - [Author Information](#author-information)

## Getting Started

These instructions will help you set up and run the AttendEase application on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following installed on your local machine:

- Node.js (version 14.x or later)
- npm (version 6.x or later) or yarn
- MySQL (version 8.x or later)

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/attendease.git
    cd attendease
    ```

2. Install the dependencies:
    ```sh
    npm install
    # or
    yarn install
    ```

3. Set up your environment variables. Create a `.env` file in the root directory and add your MySQL database credentials:
    ```env
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=yourpassword
    DB_DATABASE=attendease_db
    ```

### Database Setup

1. Push the schema to the database:
    ```sh
    npx drizzle-kit push
    ```

2. Optionally, you can start Drizzle Studio for a visual interface:
    ```sh
    npx drizzle-kit studio
    ```

## Usage

### Development Server

To start the development server, run:
```sh
npm run dev
# or
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

To create an optimized production build, run:
```sh
npm run build
# or
yarn build
```

To start the production server, run:
```sh
npm start
# or
yarn start
```

## Configuration

### Tailwind CSS

Tailwind CSS is configured in `tailwind.config.js`. Customize the theme, add plugins, and configure other Tailwind-specific settings as needed.

### Drizzle ORM

Drizzle ORM is configured in `drizzle.config.js`, including the schema definitions and MySQL connection settings. Ensure your database credentials are correctly set in the `.env` file.

### Middleware

Authentication middleware is set up in `src/middleware.js` using `@kinde-oss/kinde-auth-nextjs` for session management and redirects unauthenticated users to the login page.

### Utility Functions

Utility functions for the application are located in `src/utils/index.js` and `src/lib/utils.js`.

## APIs

### Authentication API

The authentication API is located at `src/app/api/auth/[kindeAuth]/route.js`. It handles user authentication using Kinde Auth.

### Student API

The student API is located at `src/app/api/student/route.js`. It handles creating new student records and retrieving all students.

- **POST /api/student**
  - **Description**: Adds a new student record to the database.
  - **Request Body**: 
    ```json
    {
      "fullName": "John Doe",
      "grade": "1st",
      "phone": "+1234567890",
      "address": "123 Main St"
    }
    ```
  - **Response**: 
    ```json
    {
      "id": 1,
      "fullName": "John Doe",
      "grade": "1st",
      "phone": "+1234567890",
      "address": "123 Main St"
    }
    ```

- **GET /api/student**
  - **Description**: Retrieves all student records from the database.
  - **Response**: 
    ```json
    [
      {
        "id": 1,
        "fullName": "John Doe",
        "grade": "1st",
        "phone": "+1234567890",
        "address": "123 Main St"
      },
      {
        "id": 2,
        "fullName": "Jane Smith",
        "grade": "2nd",
        "phone": "+0987654321",
        "address": "456 Oak Avenue"
      }
    ]
    ```

### Grade API

The grade API is located at `src/app/api/grade/route.js`. It handles retrieving grades from the database.

- **GET /api/grade**
  - **Description**: Retrieves all grade records from the database.
  - **Response**: 
    ```json
    [
      {
        "id": 1,
        "grade": "1st"
      },
      {
        "id": 2,
        "grade": "2nd"
      }
    ]
    ```

## Components

### react-hook-form

Used for form handling and validation.

- **Usage**: Simplifies form validation and submission.
- **Documentation**: [react-hook-form](https://react-hook-form.com/get-started)

### axios

Used for making HTTP requests to the backend APIs.

- **Usage**: Provides a simple and consistent interface for sending asynchronous HTTP requests and handling responses.
- **Documentation**: [axios](https://axios-http.com/docs/intro)

### ag-grid-react

Used to display data in a table format with powerful features like sorting, filtering, and custom cell rendering.

- **Usage**: Create tables that list student records with features like filtering and custom buttons.
- **Documentation**: [ag-grid-react](https://www.ag-grid.com/react-data-grid/)

## Sample Data

To populate the database with some initial data for testing, you can use the following SQL commands:

```sql
INSERT INTO grades (grade) VALUES ('1st'), ('2nd'), ('3rd');

INSERT INTO students (fullName, grade, phone, address) VALUES
('John Doe', '1st', '+1234567890', '123 Maple Street'),
('Jane Smith', '2nd', '+0987654321', '456 Oak Avenue'),
('Alice Johnson', '3rd', '+1122334455', '789 Pine Road');
```

## Scripts

The following scripts are available:

- `dev`: Runs the Next.js development server.
- `build`: Creates an optimized production build.
- `start`: Starts the production server.
- `lint`: Runs ESLint for code quality checks.
- `db:push`: Pushes the schema to the database using Drizzle Kit.
- `db:studio`: Starts Drizzle Studio for database management.

## Technologies Used

- **Next.js**: A React framework for production.
- **Tailwind CSS**: A utility-first CSS framework.
- **Drizzle ORM**: A lightweight ORM for TypeScript and JavaScript.
- **Kinde Auth**: Authentication for Next.js applications.
- **MySQL**: A relational database management system.
- **react-hook-form**: Easy form handling and validation for React.
- **axios**: Promise-based HTTP client for making requests to the backend.
- **ag-grid-react**: A powerful React data grid for displaying and manipulating large datasets.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

### Author Information

This project was developed by Haruna Bah Jibril (harzkane@gmail.com) as a solo project.
