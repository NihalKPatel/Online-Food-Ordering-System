const {authJwt} = require("../middleware");
const controller = require("../controllers/user.controller");
const food = require("../controllers/auth.controller");
const router = require("express").Router();

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    router.get("/all", controller.allAccess);

    router.get(
        "/user",
        [authJwt.verifyToken],
        controller.userBoard
    );

    router.get("/restaurant", food.getrestaurant);
    app.use('/api/user', router);
};
