const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// database
const db = require("./app/models");
const Role = db.role;
const User = db.user;
db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
    res.json({message: "Welcome to S N H deliveries application."});
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync Db');
    initial();
});

function initial() {
    Role.create({
        id: 1,
        name: "user"
    });

    User.create({
        firstname: "Nihal",
        lastname: "Patel",
        address: "1234 Main St",
        username: "nihal",
        email: "nihal@gmail.com",
        password: "nihal123"
    })

    User.create({
        firstname: "Hamesh",
        lastname: "Patel",
        address: "1234 Main St",
        username: "hamesh",
        email: "hamesh@gmail.com",
        password: "hamesh123"
    })

    User.create({
        firstname: "Suwesh",
        lastname: "Ranjitkar",
        address: "1234 Main St",
        username: "suwesh",
        email: "suwesh@gmail.com",
        password: "suwesh123"
    })
}
