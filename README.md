# Book Notes App

## Setup Instructions

1. Install dependencies:
   ```
   npm install
   ```

2. Create a PostgreSQL database:
   ```
   CREATE DATABASE booknotes;
   ```

3. Create the table:
   ```
   psql -d booknotes -f db/schema.sql
   ```

4. Create a `.env` file with:
   ```
   PGUSER=postgres
   PGPASSWORD=your_password
   PGHOST=localhost
   PGDATABASE=booknotes
   PGPORT=5432
   ```

5. Start the app:
   ```
   nodemon index.js
   ```

Visit: [http://localhost:3000](http://localhost:3000)
