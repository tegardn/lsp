"use strict";

const express = require("express");
const transactionRouter = express.Router();

// init controller
const {
  TransactionController,
} = require("../Controller/TransactionController");

// endpoint router

// menampilkan data
transactionRouter.get("/transaction", TransactionController.ShowAllTransactionsController);

// detail transaksi
transactionRouter.get("/transaction/:id", TransactionController.ShowTransationByIdController);

// membuat pesanan
transactionRouter.put("/transaction/:id", TransactionController.UpdateStatusTransactionController)

module.exports = { transactionRouter };
