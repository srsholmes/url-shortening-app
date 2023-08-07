# Url Shortening App
## Description
This is a simple url shortening app that allows users to shorten urls. 

## Installation
1. Clone this repository
2. Run `yarn` to install dependencies. You must use yarn as this project uses yarn workspaces.
3. Run docker-compose up to start the database
4. In a separate terminal, run `yarn dev` to start the frontend and back end servers.
5. Visit http://localhost:3000 to view the app.

## About
The repo uses yarn workspaces to manage the frontend and backend.  The frontend application is a Next.JS app and the backend is written as a GraphQL server in express.

Types are share between the frontend and backend using the `@graphql-codegen` library. This allows for type safety between the frontend and backend. There is a sdk generated for the frontend to make requests to the backend. This can be found in the `package/graphql` folder.

## Tests

### Backend
`yarn workspace @app/backend test`

The backend is tested via integration tests using Vitest. The tests are located in the `test/integration` folder.

### Frontend
`yarn workspace @app/frontend test`

## Notes

### Jest
I spent a considerable amount of time trying to get jest to work but was unable to due to problems with modules / modern code. I used vitest instead as it works out of the box with typescript and modules.

Vitest uses the same API as jest and is a drop in replacement. Hopefully this is ok.

### Docker
I wasn't able to get the app to run using a single docker-compose command, unfortunately. I ran into dependency issues with different architecture between the docker image and my local machine. I tried to resolve it for a considerable time but was unable to in reasonable time.


