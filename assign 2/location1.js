const exp = require("express");
const app = exp();
app.use(exp.static("sf"));

let dbParameters = {
    host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'chandan',
    port: 3306
};
const mysql = require("mysql2");
let conn = mysql.createConnection(dbParameters);

app.get("/getItem", (req, res) => {
    let inputpin = req.query.pin;
    let output = { status: false, row: [] };
    conn.query("select * from location where PIN=?", [inputpin], (err, rows) => {
        if (rows.length > 0) {
            output.status = true;
            output.row = rows[0];
            console.log(rows[0]);
        }
        if (err) {
            console.log("Could not connect to database");
        }
        res.send(output);
    });
});

app.listen(90, () => {
    console.log("server listening at port 99...");
});
