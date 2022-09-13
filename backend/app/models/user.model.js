const moment = require("moment");
module.exports = (sequelize, Sequelize) => {
    return sequelize.define("users", {
        username: {
            type: Sequelize.STRING
        },
        firstname: {
            type: Sequelize.STRING
        },
        lastname: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        dob:{
            type: Sequelize.DATEONLY,
            allowNull: false,
            get: function() {
                return moment(this.getDataValue('dob')).format('DD/MM/YYYY')
            }
        }

    });
};
