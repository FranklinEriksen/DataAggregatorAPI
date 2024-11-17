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