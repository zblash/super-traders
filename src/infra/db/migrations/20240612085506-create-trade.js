"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("trades", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      date: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      portfolioId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "portfolios",
          key: "id",
        },
      },
      shareId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "shares",
          key: "id",
        },
      },
      rate: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM,
        values: ["BUY", "SELL"],
        allowNull: false,
      },
    });

    queryInterface.addIndex("trades", ["shareId", "userId"]);
    queryInterface.addIndex("trades", ["userId"]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("trades");
  },
};
