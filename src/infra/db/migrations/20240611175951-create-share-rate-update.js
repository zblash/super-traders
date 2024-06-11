"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("shareRateUpdates", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      shareId: {
        allowNull: false,
        references: {
          model: "shares",
          key: "id",
        },
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
        type: Sequelize.INTEGER,
      },
      isSystemUpdate: {
        type: Sequelize.BOOLEAN,
      },
      rate: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
      },
      date: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("shareRateUpdates");
  },
};
