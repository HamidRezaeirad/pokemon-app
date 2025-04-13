# Pokemon App

This project is a Pokémon battle simulator designed as part of the Pokemon Coding Challenge. It allows users to simulate battles between two teams of Pokémon using a dataset of Pokémon in MongoDB document. The simulator evaluates various properties (weight,height,multipliers) of the Pokémon to determine the outcome of the battles.

## Technologies

- **NestJS**: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- **TypeScript**: A strongly typed programming language that builds on JavaScript.
- **Swagger**: A tool for documenting APIs.
- **Jest**: A delightful JavaScript testing framework with a focus on simplicity.
- **Mongoose**: An elegant MongoDB object modeling tool for Node.js.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/HamidRezaeirad/pokemon-app.git
   ```
2. Navigate to the project directory:
   ```bash
   cd pokemon-app
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

## Database

The project uses **MongoDB** as its database to store Pokémon data. MongoDB is a NoSQL database that provides flexibility and scalability for managing large datasets.

### Setting Up MongoDB

To run MongoDB, you can use Docker Compose provided in the root of the project. This setup also includes **mongo-express**, a web-based MongoDB admin interface.

1. Ensure Docker is installed on your system.
2. Run the following command in the root of the project:
   ```bash
   docker-compose up mongo mongo-express
   ```
3. MongoDB will be available at `mongodb://localhost:27017`, and you can access **mongo-express** at `http://localhost:8081`.

   ```env
    MONGO_URI=mongodb://root:example@localhost:27017/PokemonDB?authSource=admin
   ```

## Database Config

Please configure `.env` based on `.env.example` file

```
APP_PORT=3000

POKEMON_DATA_URL=https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json?_sm_au_=iVV5F7R6VsVpqJM6pGsWvKttvN1NG

MONGO_USER=root
MONGO_PASS=example
MONGO_HOST=localhost
MONGO_PORT=27017
MONGO_DB=PokemonDB
MONGO_AUTH_DB=admin
```

## Running the Project

1. Start the development server:
   ```bash
   npm run start:dev
   ```
2. The API will be available at `http://localhost:3000/api`.

## Running Tests

```bash
# Eslint
$ npm run lint

# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Swagger Documentation

1. Start the development server:
   ```bash
    npm run start:dev
   ```
2. Open your browser and navigate to `http://localhost:3000/api-docs` to view the Swagger documentation.

## Postman Docs

You can find the Postman collection in the `postman-docs` folder. This collection contains predefined API requests that you can use to test and interact with our API endpoints.

### CURL Examples

Here are some example CURL commands to interact with the API:

#### Get All Pokémon

```bash
curl -X 'POST' \
  'http://localhost:3000/api/battles' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "teamA": [
    "Pikachu",
    "Charmander"
  ],
  "teamB": [
    "Bulbasaur",
    "Squirtle"
  ]
}'
```
