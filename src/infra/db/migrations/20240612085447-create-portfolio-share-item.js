"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("portfolioShareItems", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      shareId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "shares",
          key: "id",
        },
      },
      portfolioId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "shares",
          key: "id",
        },
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });

    queryInterface.addIndex("portfolioShareItems", ["shareId", "portfolioId"]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("portfolioShareItems");
  },
};
