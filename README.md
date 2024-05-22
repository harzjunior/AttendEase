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
  - [Project Structure](#project-structure)
  - [Scripts](#scripts)
  - [Technologies Used](#technologies-used)
  - [Author](#author)
  - [License](#license)

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

Tailwind CSS is configured in `tailwind.config.js`. Here you can customize the theme, add plugins, and configure other Tailwind-specific settings.

### Drizzle ORM

Drizzle ORM is configured in `drizzle.config.js`. This includes the schema definitions and MySQL connection settings. Ensure your database credentials are correctly set in the `.env` file.

### Middleware

Authentication middleware is set up in `src/middleware.js`. It uses `@kinde-oss/kinde-auth-nextjs` for session management and redirects unauthenticated users to the login page.

### Utility Functions

Utility functions for the application are located in `src/utils/index.js` and `src/lib/utils.js`.

## Project Structure

Here is an overview of the project's structure:

- **`/src/app/api/auth/[kindeAuth]/route.js`**: Handles authentication routes.
  ```javascript
  import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";
  export const GET = handleAuth();
  ```

- **`/src/app/dashboard/layout.js`**: Defines the layout for the dashboard including the side navigation and header.
  ```javascript
  import React from "react";
  import SideNav from "./_components/SideNav";
  import Header from "./_components/Header";

  function layout({ children }) {
    return (
      <div>
        <div className="md:w-64 fixed hidden md:block">
          <SideNav />
        </div>
        <div className="ml-64">
          <Header />
          {children}
        </div>
      </div>
    );
  }

  export default layout;
  ```

- **`/src/app/dashboard/page.js`**: Defines database schemas for grades, countries, and cities.
  ```javascript
  import {
    mysqlTable,
    int,
    varchar,
    mysqlEnum,
    uniqueIndex,
  } from "drizzle-orm/mysql-core";

  export const GRADES = mysqlTable("grades", {
    id: int("id").primaryKey(),
    grade: varchar("grade", { length: 10 }).notNull(),
  });

  export const countries = mysqlTable(
    "countries",
    {
      id: int("id").primaryKey(),
      name: varchar("name", { length: 256 }),
    },
    (countries) => ({
      nameIndex: uniqueIndex("name_idx").on(countries.name),
    })
  );

  export const cities = mysqlTable("cities", {
    id: int("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    countryId: int("country_id").references(() => countries.id),
    popularity: mysqlEnum("popularity", ["unknown", "known", "popular"]),
  });
  ```

- **`/src/app/globals.css`**: Contains global CSS styles.
- **`/src/common`**: Contains common components like button, carousel, and theme provider.
- **`/src/components/ui`**: Contains major UI components.

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

## Author

This project is a solo effort by Haruna Bah Jibril (harzkane@gmail.com). Despite initial plans to collaborate with a team of four, it proved challenging to be paired with colleagues, leading to this solo endeavor.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.