let dbparams = {
    host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'pleasework',
    port: 3306
};
const mysql = require('mysql2');
const con = mysql.createConnection(dbparams);

const express = require('express');
const app = express();

app.use(express.static("folder"));
app.get("/getPin", (req, res) => {
    let input = req.query.pin;
    console.log(input);

    let output = {
        status: false,
        itemdetails: { pin: 0, area: "" }
    };

    con.query('select * from pincode where pin =?', [input], (error, rows) => {
        if (rows.length > 0) {
            output.status = true;
            output.itemdetails = rows[0];
        }
        res.send(output);
        console.log(output);

    });


});

app.listen(990, function () { });
