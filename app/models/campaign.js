module.exports = (sequelize, DataTypes) => {
  const campaign = sequelize.define('campaign', {
    title: DataTypes.TEXT,
    publisher_id: DataTypes.INTEGER
  }, {
    paranoid: true,
    classMethods: {
      associate: (models) => {
        campaign.belongsTo(models.publisher);
      }
    }
  });
  return campaign;
};
