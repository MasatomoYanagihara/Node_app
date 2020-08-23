"use strict";

// module.exportsは外部から使用できるようにする処理。
module.exports = (sequelize, DataTypes) => {

  // オブジェクト作成、変数 = sequelize.define(モデル名, モデルの属性(カラムに相当), オプション);
  const User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      pass: DataTypes.STRING,
      mail: DataTypes.STRING,
      age: DataTypes.INTEGER,
    },
    {}
  );

  User.associate = function (models) {
    // associations can be defined here
  };

  return User;
};
