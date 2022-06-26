let datab = {
    host: "localhost",
    user: "root",
    password: "cdac",
    database: "pleasework",
    port: 3306
};
let resourceId = 102;
const mysql = require("mysql2");
const con = mysql.createConnection(datab);
con.query("select resourceId,resourcename,status from resource where resourceId=?", [resourceId], (err, rows) => {

    if (err) {
        console.log("Error");
    } else {
        if (rows.length > 0) {
            console.log("Succeed: " + rows[0].resourceId + " " + rows[0].resourcename + " " + rows[0].status);
        } else {
            console.log("None rows are shown");
        }
    }
});