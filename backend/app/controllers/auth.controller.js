const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Restaurant = db.restaurant;
const Op = db.Sequelize.Op;
const Menu = db.menu;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const {where} = require("sequelize");

exports.signup = (req, res) => {
    // Save User to Database
    User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        address: req.body.address,
        email: req.body.email,
        dob: req.body.dob,
        password: bcrypt.hashSync(req.body.password, 8)
    })
        .then(user => {
            if (req.body.roles) {
                Role.findAll({
                    where: {
                        name: {
                            [Op.or]: req.body.roles
                        }
                    }
                }).then(roles => {
                    user.setRoles(roles).then(() => {
                        res.send({message: "User registered successfully!"});
                    });
                });
            } else {
                // user role = 1
                user.setRoles([1]).then(() => {
                    res.send({message: "User registered successfully!"});
                });
            }
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};

exports.getrestaurant = (req, res) => {
    Restaurant.findAll({
        include: ["menus"],
    }).then((restaurants) => {
        res.send(restaurants);
        return restaurants;
    });
}

exports.signin = (req, res) => {
    User.findOne({
        where: {
            email: req.body.email,
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({message: "User Not found."});
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            var token = jwt.sign({id: user.id}, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            var authorities = [];
            user.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    authorities.push("ROLE_" + roles[i].name.toUpperCase());
                }
                res.status(200).send({
                    id: user.id,
                    email: user.email,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    address: user.address,
                    dob: user.dob,

                    roles: authorities,
                    accessToken: token
                });
            });
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};
