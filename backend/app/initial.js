const db = require("./models");
const Role = db.role;
const User = db.user;
const Restaurant = db.restaurant;
const Menu = db.menu;

module.exports = function (initial) {
    {
        Role.create({
            id: 1,
            name: "user"
        });

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
    return initial;
}

