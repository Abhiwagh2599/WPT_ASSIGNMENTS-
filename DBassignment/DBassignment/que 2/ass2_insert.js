const url = "";
let datab = {
    host: "localhost",
    user: "root",
    password: "cdac",
    database: "pleasework",
    port: 3306
};
let itemno = 10;
let itemname = "book";
let price = 100;
let category = "School";
const mysql = require("mysql2");
const con = mysql.createConnection(datab);
con.query("insert into item (itemno,itemname,price,category) values(?,?,?,?)", [itemno, itemname, price, category], (err, res1) => {
    if (err) {
        console.log("Error");
    } else {
        console.log("Successful insertion" + res1.affectedRows);
    }

});