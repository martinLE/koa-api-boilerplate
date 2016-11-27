module.exports = (sequelize, DataTypes) => {
  return sequelize.define('api_user', {
    username: DataTypes.TEXT,
  }, {
    paranoid: true,
    classMethods: {
      // associate: (models) => {
      //   // associations can be defined here
      // }
    }
  });
};
