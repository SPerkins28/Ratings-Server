require('dotenv').config();
const express = require('express');
const db = require('./db');
const app = express();

app.use(require('./middleware/headers'));

const controllers = require('./controllers');
let post = require ('./controllers/postcontroller');

const validateSession = require('./middleware/validateSession');

app.use(express.json());

app.use("/user", controllers.usercontroller);

app.use("/post", post);

app.use('/review', controllers.reviewcontroller);


db.authenticate()
.then(() => db.sync())
.then(() => {
    app.listen(process.env.PORT, () => console.log(`[Server: ] App is listening on Port ${process.env.PORT}`));
})
.catch((err) => {
    console.log("[Server: ] Server Crashed");
    console.log(err);
})
