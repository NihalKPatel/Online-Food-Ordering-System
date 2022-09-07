module.exports = (sequelize, Sequelize) => {
    return sequelize.define("menus", {
        name: {
            type: Sequelize.INTEGER,
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
    });
};
