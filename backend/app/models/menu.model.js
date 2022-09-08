module.exports = (sequelize, Sequelize) => {
    return sequelize.define("menus", {
        name: {
            type: Sequelize.STRING,
        },
        price: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        image: {
            type: Sequelize.STRING
        },
        restaurantId: {
            type: Sequelize.INTEGER,
            foreignKey: true
        }
    });
};
