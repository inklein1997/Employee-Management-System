const express = require('express');
const { sumBy } = require('lodash');
const mysql = require('mysql2');

const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

const db = mysql.createConnection(
    {
        host:'localhost',
        user:'root',
        password:'1234',
        database:'company_db'
    },
    console.log('Connection to company_db established!')
);

db.query()

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})