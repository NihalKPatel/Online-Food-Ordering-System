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
    }

  });
};
