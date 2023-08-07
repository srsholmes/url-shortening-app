# Url Shortening App

## Description

This is a simple url shortening app that allows users to shorten urls.

## Installation

1. Clone this repository
2. Run `yarn` to install dependencies. You must use yarn as this project uses yarn workspaces.
3. Run `docker-compose up` to start the database.
4. In a separate terminal, run `yarn dev` to start the frontend and back end servers.
5. Visit http://localhost:3000 to view the app.

## About

The repo uses yarn workspaces to manage the frontend and backend. The frontend and backend are located in the `app` folder. There is a `package` folder that contains shared code between the frontend and backend. This includes the graphql schema and types.

### Frontend

The frontend application is a Next.JS App. The initial content is server rendered and then the app is hydrated on the client when a new url is added. The app is styled using vanilla CSS (modules). The frontend uses a sdk to make requests to the backend.

### Backend

The backend is a GraphQL server written using express as per the requirements.

### Types

Types are share between the frontend and backend by using the `@graphql-codegen` library. This allows for type safety between the frontend and backend. There is a sdk generated for the frontend to make requests to the backend. This can be found in the `package/graphql` folder.

## Tests

### Backend
 1. Make sure the app is not running, as the tests will spin up the server
 2. `docker-compose up` to start the database.
 3. `yarn workspace @app/backend test`

The backend is tested via integration tests using Vitest. The tests are located in the `test/integration` folder.

### Frontend

Make sure the app is running (with docker as well) and then run
`yarn workspace @app/frontend test`

The frontend is tested using playwright. The tests are located in the `tests` folder. Extensive testing has not been done on the frontend due to time constraints.

## Notes

### Jest

I spent a considerable amount of time trying to get jest to work but was unable to due to problems with modules / modern code. I used vitest instead as it works out of the box with typescript and modules.

Vitest uses the same API as jest and is a drop in replacement. Hopefully this is ok. I didn't want to waste time trying to get jest to work. I have done it many times and know what a pain it can be.

### Docker

I wasn't able to get the app to run using a single docker-compose command, unfortunately. I ran into dependency issues with different architecture between the docker image and my local machine. I tried to resolve it for a considerable time but was unable to in reasonable time. I feel confident that I would be able to solve the problem eventually, but didnt want to spend too much time on it.

## Checklist
- The specs for the application were:
- A user needs to be able to enter a URL and they will get an 8 character (lowercase-alphanumeric) shortened version of the URL. ✅
- URLs are shortened and persisted into MongoDB via a REST or GraphQL API. ✅
- The frontend app will display a list of previously shortened URLs. ✅
- New URLs will be generated and added to the frontend list. ✅
- The same 8-characters cannot be used twice i.e. each shortened URL needs to be unique. ✅
- The URLs need to be shortened with the following domain 'pbid.io' e.g. https://pbid.io/f3x2ab1c ✅
- The shortened URL do not need to actually redirect/work as the domain doesn’t exist. ✅
- The entire system needs to be runnable using Docker, a simple compose file will do.❕ (See notes above)
- Appropriate tests should be added to the code, using the jest framework. ❕(See notes above)
- The app layout should be responsive. ✅
- Add a root README.md describing what the application is, and how to run it. ✅
