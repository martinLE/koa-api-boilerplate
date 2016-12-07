export default (sequelize, DataTypes) => {
  return sequelize.define('api_user', {
    username: DataTypes.TEXT,
  }, {
    classMethods: {
      // associate: (models) => {
      //   // associations can be defined here
      // }
    }
  });
};
