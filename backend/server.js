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
const Restaurant = db.restaurant;
const Menu = db.menu;
const restaurant_menus = db.restaurant_menus;
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

db.sequelize.sync({force: false}).then(() => {
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

    Restaurant.create({
        name: "McDonalds",
        address: "1234 Main St",
        phone: "123-456-7890",
        rating: "4.5",
        hours: "9am-9pm",
        description: "Fast food restaurant"
    })

    Restaurant.create({
        name: "Burger King",
        address: "1234 Main St",
        phone: "123-456-7890",
        rating: "4.5",
        hours: "9am-9pm",
        description: "Fast food restaurant"
    })

    Menu.create({
        restaurantId: 1,
        name: "Big Mac",
        price: "5.99",
        description: "Big Mac"
    })
        .catch(err => {
            console.log('error: ' + err);
        });
    Menu.create({
        restaurantId: 1,
        name: "Whopper",
        price: "5.99",
        description: "Whopper"
    })
        .catch(err => {
            console.log('error: ' + err);
        });
    Menu.create({
        restaurantId: 1,
        name: "Fries",
        price: "1.99",
        description: "Fries"
    })
        .catch(err => {
            console.log('error: ' + err);
        });
    Menu.create({
        restaurantId: 2,
        name: "Coke",
        price: "1.99",
        description: "Coke"
    })
        .catch(err => {
            console.log('error: ' + err);
        });
    Menu.create({
        restaurantId: 2,
        name: "Sprite",
        price: "1.99",
        description: "Sprite"
    })
        .catch(err => {
            console.log('error: ' + err);
        });
    Menu.create({
        restaurantId: 2,
        name: "Water",
        price: "1.99",
        description: "Water"
    })
        .catch(err => {
            console.log('error: ' + err);
        });

    Menu.create({
        restaurantId: 2,
        name: "Chicken Nuggets",
        price: "3.99",
        description: "Chicken Nuggets"
    })
        .catch(err => {
        console.log('error: ' + err);
    });
}
