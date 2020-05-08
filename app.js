//<=========== Import packages ==========>
const express = require("express");
const path = require("path");
const body_parser = require("body-parser");
const mysql = require("mysql");
const config = require("./dbConfig.js");


//=========Put to use==========
const app = express();
const con = mysql.createConnection(config);

//<=========== Middleware ==========>
app.use(body_parser.urlencoded({ extended: true })); //when you post service
app.use(body_parser.json());
// =========== Services ===========


// =========== Services (Page loading) ===========

//Root Page 
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "/dashboard.html"));
});

app.get("/prohibit", (req, res) => {
    res.sendFile(path.join(__dirname, "/prohibit.html"));
});


app.post("/loadInfo", function (req, res) {
    const username = req.params.username;
    const password = req.params.password;
    const sql = "SELECT username,password from user where id=1;"
    con.query(sql, [username,password], function (err, result, fields) {
        if (err) {
            res.status(503).send("DB error");
        } else {
            res.json(result).send()
        }
    })
});




//================== Services (functions) ===================

// app.use("/img", express.static(path.join(__dirname, 'img')));
// ========== Starting server ============
const PORT = 35000
app.listen(PORT, function () {
    console.log("Server is running at " + PORT);
});