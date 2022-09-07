module.exports = (sequelize, Sequelize) => {
    return sequelize.define("restaurants", {
        name: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        },
        rating: {
            type: Sequelize.STRING
        },
        hours: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        }
    });
};
