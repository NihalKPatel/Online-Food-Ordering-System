const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// database
const db = require("./app/models");
db.sequelize.sync();

app.get("/", (req, res) => {
    res.json({message: "Welcome to S N H deliveries application."});
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
const initial = require("./app/initial.js");

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

db.sequelize.sync({force: false}).then(() => {
    console.log('Drop and Resync Db');
    initial();
});


