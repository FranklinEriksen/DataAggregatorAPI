## Project setup

Install the project

```bash
$ npm install
```

Run the project

```bash
$ npm run start:dev
```

## Design choices

I have decided to make a very simple API that does 2 things. <br>

1. Get data from the Transaction API (Mocked and with a small mock API in the Repo),
   and I save this data to a local SQLite database in the repo.
2. Expose 2 endpoints for the user to request and get aggregated data returned.

The most relevant code can be found in the src/data-aggregator/data-aggregator.service.ts file.

If you run the app, then you can call the 2 endpoints using:

To get the aggregated data on the 074092 user, then you can call:

```bash
$ curl localhost:3000/data-aggregator/074092
```

To get the aggregated payout data for 074092 user, then you can call:

```bash
$ curl localhost:3000/data-aggregator/payouts/074092
```

## Assumptions

I have assumed that the Transaction API can be filtered by the createdAt variable.

## Testing Strategy

Seeing as we're given a lot of technical requirements when starting the challenge, then I would try
and lean onto them for the testing setup.

For example, with speed being a high concern, and load onto the Transaction API,
then I would try and make a test setup where I ensured the microservice could handle a high load.

Equally I would also make tests to ensure that the data I save in the database is always in the
correct formated, and likewise retrieved in the correct format, going through the API endpoints

## Future work

Some ideas for future work on this project as I ran out of time:

1. Swagger documentation for the API endpoints
2. Load test of the Microservice with the database to ensure good response times.
3. Investigate the size of the Transaction API database, and ensure it would still make sense to
   cache everythig on our end.
4. Swap out the SQLite database with something more scaleable, most likely Postgres setup.
5. Depending on how the project would be used, then a REDIS cache in front of the Postgres would
   also make it more scalable.