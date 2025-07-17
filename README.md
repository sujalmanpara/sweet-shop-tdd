# Sweet Shop TDD

This project is a Sweet Shop management application built with Next.js and TypeScript, following a strict Test-Driven Development (TDD) process. It provides a robust backend service for managing a sweet shop's inventory, including adding, deleting, searching, purchasing, and restocking sweets. The application also features a simple frontend UI to interact with the service.

## Features

- **Sweet Management:** Add, delete, and view sweets in the inventory.
- **Search:** Search for sweets by name, category, or price range.
- **Inventory Control:** Purchase and restock sweets with validation for stock levels.
- **TDD:** Developed using a red-green-refactor TDD approach with Jest and React Testing Library.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or later)
- [npm](https://www.npmjs.com/)

### Installation

1.  Clone the repository:
    ```bash
    git clone <your-repository-url>
    ```
2.  Navigate to the project directory:
    ```bash
    cd sweet-shop-tdd
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```

### Running the Application

To start the development server, run:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Running Tests

This project uses Jest for testing. To run the tests, use the following command:

```bash
npm test
```

To generate a test coverage report, run:

```bash
npm run test:coverage
```

The report will be available in the `coverage` directory.
