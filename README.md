# Full stack Todo list app with CRUD operations
React, Tailwind, PostgreSQL, Node.js

## How to start locally

### client side
`./client`

* open terminal
* `npm install` 
* `npm start`


### server side
`./server`

* open terminal
* `npm install` 
* `npm start`

### start database

* create a `.env` with the following key value pairs:

    ```
    USERNAME=[postgresql_username]
    HOST=[localhost]
    DBPORT=[postgres_port]
    PORT=[server_port]
    ```
 
* configure PostgreSQL in your machine (https://postgres.app/)
* open PostgreSQL and open a terminal under your database
* copy/paste the operations under `db.js`



### Troubleshooting

* check the `.env` file under `./server` with the following key value pairs:
    ```
    USERNAME=[postgresql_username]
    HOST=[localhost]
    DBPORT=[postgres_port]
    PORT=[server_port]
    ```