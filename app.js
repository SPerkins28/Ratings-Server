require('dotenv').config();

const express = require("express");
const db = require("./db");
const app = express();


db.authenticate()
.then(() => db.sync())
.then(() => {
    app.listen(process.env.PORT, () => console.log(`[Server: ] App is listening on Port ${process.env.PORT}`));
})
.catch((err) => {
    console.log("[Server: ] Server Crashed");
    console.log(err);
})
