module.exports = (sequelize, DataTypes) => {
  const publisher = sequelize.define('publisher', {
    title: DataTypes.TEXT
  }, {
    classMethods: {
      associate: (models) => {
        publisher.hasMany(models.campaign);
      }
    }
  });
  return publisher;
};
