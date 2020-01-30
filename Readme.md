# movierama-app

Movierama application is a SPA where users can browser the latest movies and search also in the database for old ones.

## Installation and running locally

To install dependancies run
`yarn`

- To get the app running locally for the production versio `yarn:prod`
- For development and hot-loading `yarn:dev`

## Running Tests

Run `yarn test` to run the tests for this application.

## Tech

1. Movierama was developed using Typescript and React.
2. Babel was used for the transpilation of the app and webpack for the bundling. No cli was used for the build of this app.
3. The unit testing are written using Jest and react-testing-library.
4. No CSS frameworks were used for this project.

- In this project can also be found an initial implementation of DDD, the aim of the services was to sanitize the data in order to utilize clean data in the UI. A prototype of this idea can be found in `moreDetailsService_PROTOTYPE`.
