# HR Platform Backend
The HR Platform backend is a server-side application that provides the necessary functionality for the HR Platform app. This is the author's first more advanced backend project and is part of a full-stack application. It connects to a SQL database using the MySQL2 package and implements CRUD operations to manage data. The application uses Express for handling HTTP requests and responses, supports CORS for cross-origin resource sharing, and overrides HTTP methods using the method-override library. The backend is built with TypeScript for improved development experience and includes Jest for testing with TS-Jest for TypeScript testing support. The HR Platform backend is a crucial component of the overall HR Platform app, providing a secure and efficient means of managing HR-related data.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
- Node.js >=14
- npm
- A SQL database (e.g. MySQL)

### Installing
1. Clone the repository to your local machine.

```bash
git clone https://github.com/chimny/HRPlatformBackEnd.git
```

2.Navigate to the project directory.

```bash
cd HRPlatformBackend
```

3.Install the dependencies

```bash
npm install
```

4.Create sql database (locally or on deployed server
```SQL
Please use sql database attached in sql folder as an entry point
```

5.Configure the database connection.
```javascript
within db.ts file update credential to create connection on your own purposes
```

## Running the Application

1.Start the application in development mode.

```bash
npm run start:dev
```

2.Access the application in a web browser at http://localhost:3000/.


## Running the Tests

Run the test suite in development mode.
```bash
npm run test-develop
```



## Built With

- [Node.js](https://nodejs.org/en/)
- [MySQL2](https://github.com/mysqljs/mysql)
- [Express](https://expressjs.com/)
- [CORS](https://github.com/expressjs/cors)
- [Method Override](https://github.com/expressjs/method-override)
- [TypeScript](https://www.typescriptlang.org/)
- [Jest](https://jestjs.io/)
- [TS-Jest](https://github.com/kulshekhar/ts-jest)

## License 

This project is licensed under the ISC License.


## Acknowledgments 

[OpenAI](https://openai.com/) for providing the AI language model used in this project (mostly for writing tests and code review purposes).
