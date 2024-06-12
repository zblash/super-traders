# Super Traders

## Installation Instructions

1. **Ensure Node.js version 18 or higher is installed**.

2. **Install dependencies**:
   You can use any of the following package managers:

   ```sh
   npm install
   # or
   yarn
   # or
   pnpm install
   ```

3. **Running Tests**:
   To run tests, use

   ```sh
   npm run test
   yarn test
   pnpm run test

   # and

   npm run test:coverage
   yarn test:coverage
   pnpm run test:coverage
   ```

4. **Setup Database**:

   ## You can use docker-compose file to create instance of Postgresql otherwise you should update /src/infra/db/config/config.json

   You should migrate database before running project, use:

   ```sh
      npm run migrate
      yarn migrate
      pnpm run migrate
   ```

   or you can run migrations with your terminal

   ```sh
      cd src/infra/db; npx sequelize-cli db:migrate
   ```

   Then, you can use seeders for easy testing, use:

   ```sh
      npm run seed
      yarn migrate
      pnpm run seed
   ```

   or you can run seeders with your terminal

   ```sh
      cd src/infra/db; npx sequelize-cli db:seed:all
   ```

5. **Run Dev**:
   To run the project in development mode, use:

   ```sh
   npm run dev
   yarn dev
   pnpm run dev
   ```

## Technologies Used

- **Fastify**: A fast and low-overhead web framework for Node.js.
- **Inversify**: A powerful and lightweight inversion of control (IoC) container for JavaScript and Node.js apps powered by TypeScript.
- **Sequelize**: A promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite, and Microsoft SQL Server.
- **PostgreSQL**: A powerful, open-source object-relational database system.

Find POSTMAN collection json file with name 'Super Traders API Endpoints.postman_collection.json'
