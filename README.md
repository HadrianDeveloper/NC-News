# Northcoders News API

## Background

We will be building an API for the purpose of accessing application data programmatically. The intention here is to mimic the building of a real world backend service (such as reddit) which should provide this information to the front end architecture.

Your database will be PSQL, and you will interact with it using [node-postgres](https://node-postgres.com/).


## Instructions

### Set up the connection to the PG databases

After cloning this repo, you must create the following two files in your root directory, with the line of code:

    - .env.test
        PGDATABASE=nc_news_test

    - .env.development
        PGDATABASE=nc_news_test

This will grant access to the required environment variables on your local machine, and subsequently, enable connection to the test and development databases.

### Domain

https://persian-blue-millipede-veil.cyclic.app
    /api/articles
    /api/users
    etc.