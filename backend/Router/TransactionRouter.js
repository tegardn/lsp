"use strict";

const express = require("express");
const transactionRouter = express.Router();

// init controller
const {
  TransactionController,
} = require("../Controller/TransactionController");

// endpoint router

// menampilkan data
transactionRouter.get(
  "/transaction",
  TransactionController.ShowAllTransactionsController
);

// membuat pesanan
transactionRouter.put("/transaction/:id", TransactionController.UpdateStatusTransactionController)

module.exports = { transactionRouter };
