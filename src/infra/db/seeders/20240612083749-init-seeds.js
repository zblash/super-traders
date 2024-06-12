"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const shares = await queryInterface.bulkInsert(
      "shares",
      [
        { symbol: "APL" },
        { symbol: "FRD" },
        { symbol: "GGL" },
        { symbol: "RXL" },
        { symbol: "KOC" },
      ],
      { returning: true }
    );

    await queryInterface.bulkInsert(
      "shareRateUpdates",
      [
        {
          shareId: shares[0].id,
          rate: 10,
          date: Date.now(),
          isSystemUpdate: true,
        },
        {
          shareId: shares[1].id,
          rate: 20,
          date: Date.now(),
          isSystemUpdate: true,
        },
        {
          shareId: shares[2].id,
          rate: 30,
          date: Date.now(),
          isSystemUpdate: true,
        },
        {
          shareId: shares[3].id,
          rate: 40,
          date: Date.now(),
          isSystemUpdate: true,
        },
        {
          shareId: shares[4].id,
          rate: 50,
          date: Date.now(),
          isSystemUpdate: true,
        },
      ],
      { returning: true }
    );

    const users = await queryInterface.bulkInsert(
      "users",
      [
        { name: "TEST 1", email: "test@test.com" },
        { name: "TEST 2", email: "test2@test.com" },
        { name: "TEST 3", email: "test3@test.com" },
        { name: "TEST 4", email: "test4@test.com" },
        { name: "TEST 5", email: "test5@test.com" },
      ],
      { returning: true }
    );

    const portfolios = await queryInterface.bulkInsert(
      "portfolios",
      [
        { name: "TEST 1", userId: users[0].id },
        { name: "TEST 2", userId: users[1].id },
        { name: "TEST 3", userId: users[2].id },
        { name: "TEST 4", userId: users[3].id },
        { name: "TEST 5", userId: users[4].id },
      ],
      { returning: true }
    );

    await queryInterface.bulkInsert(
      "portfolioShareItems",
      [
        { portfolioId: portfolios[0].id, shareId: shares[0].id, quantity: 10 },
        { portfolioId: portfolios[1].id, shareId: shares[1].id, quantity: 20 },
        { portfolioId: portfolios[2].id, shareId: shares[2].id, quantity: 30 },
        { portfolioId: portfolios[3].id, shareId: shares[3].id, quantity: 40 },
        { portfolioId: portfolios[4].id, shareId: shares[4].id, quantity: 50 },
      ],
      { returning: true }
    );

    await queryInterface.bulkInsert(
      "trades",
      [
        {
          date: Date.now(),
          userId: users[0].id,
          portfolioId: portfolios[0].id,
          shareId: shares[0].id,
          rate: 10,
          quantity: 10,
          type: "BUY",
        },
        {
          date: Date.now(),
          userId: users[0].id,
          portfolioId: portfolios[0].id,
          shareId: shares[0].id,
          rate: 10,
          quantity: 10,
          type: "SELL",
        },
        {
          date: Date.now(),
          userId: users[0].id,
          portfolioId: portfolios[0].id,
          shareId: shares[1].id,
          rate: 10,
          quantity: 10,
          type: "BUY",
        },
        {
          date: Date.now(),
          userId: users[0].id,
          portfolioId: portfolios[0].id,
          shareId: shares[1].id,
          rate: 10,
          quantity: 10,
          type: "SELL",
        },

        {
          date: Date.now(),
          userId: users[1].id,
          portfolioId: portfolios[1].id,
          shareId: shares[1].id,
          rate: 20,
          quantity: 20,
          type: "BUY",
        },
        {
          date: Date.now(),
          userId: users[1].id,
          portfolioId: portfolios[1].id,
          shareId: shares[1].id,
          rate: 20,
          quantity: 20,
          type: "SELL",
        },
        {
          date: Date.now(),
          userId: users[1].id,
          portfolioId: portfolios[1].id,
          shareId: shares[2].id,
          rate: 20,
          quantity: 20,
          type: "BUY",
        },
        {
          date: Date.now(),
          userId: users[1].id,
          portfolioId: portfolios[1].id,
          shareId: shares[2].id,
          rate: 20,
          quantity: 20,
          type: "SELL",
        },

        {
          date: Date.now(),
          userId: users[2].id,
          portfolioId: portfolios[2].id,
          shareId: shares[2].id,
          rate: 30,
          quantity: 30,
          type: "BUY",
        },
        {
          date: Date.now(),
          userId: users[2].id,
          portfolioId: portfolios[2].id,
          shareId: shares[2].id,
          rate: 30,
          quantity: 30,
          type: "SELL",
        },
        {
          date: Date.now(),
          userId: users[2].id,
          portfolioId: portfolios[2].id,
          shareId: shares[3].id,
          rate: 30,
          quantity: 30,
          type: "BUY",
        },
        {
          date: Date.now(),
          userId: users[2].id,
          portfolioId: portfolios[2].id,
          shareId: shares[3].id,
          rate: 30,
          quantity: 30,
          type: "SELL",
        },

        {
          date: Date.now(),
          userId: users[3].id,
          portfolioId: portfolios[3].id,
          shareId: shares[3].id,
          rate: 40,
          quantity: 40,
          type: "BUY",
        },
        {
          date: Date.now(),
          userId: users[3].id,
          portfolioId: portfolios[3].id,
          shareId: shares[3].id,
          rate: 40,
          quantity: 40,
          type: "SELL",
        },
        {
          date: Date.now(),
          userId: users[3].id,
          portfolioId: portfolios[3].id,
          shareId: shares[4].id,
          rate: 40,
          quantity: 40,
          type: "BUY",
        },
        {
          date: Date.now(),
          userId: users[3].id,
          portfolioId: portfolios[3].id,
          shareId: shares[4].id,
          rate: 40,
          quantity: 40,
          type: "SELL",
        },

        {
          date: Date.now(),
          userId: users[4].id,
          portfolioId: portfolios[4].id,
          shareId: shares[2].id,
          rate: 50,
          quantity: 50,
          type: "BUY",
        },
        {
          date: Date.now(),
          userId: users[4].id,
          portfolioId: portfolios[4].id,
          shareId: shares[2].id,
          rate: 50,
          quantity: 50,
          type: "SELL",
        },
        {
          date: Date.now(),
          userId: users[4].id,
          portfolioId: portfolios[4].id,
          shareId: shares[4].id,
          rate: 50,
          quantity: 50,
          type: "BUY",
        },
        {
          date: Date.now(),
          userId: users[4].id,
          portfolioId: portfolios[4].id,
          shareId: shares[4].id,
          rate: 50,
          quantity: 50,
          type: "SELL",
        },
      ],
      { returning: true }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("trades", null, {});
    await queryInterface.bulkDelete("portfolioShareItems", null, {});
    await queryInterface.bulkDelete("shareRateUpdates", null, {});
    await queryInterface.bulkDelete("shares", null, {});
    await queryInterface.bulkDelete("portfolios", null, {});
    await queryInterface.bulkDelete("users", null, {});
  },
};
