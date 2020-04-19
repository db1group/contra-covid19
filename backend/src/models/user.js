
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: DataTypes.STRING,
  }, {});
  User.associate = (_) => {
    // associations can be defined here
  };
  return User;
};
