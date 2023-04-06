"use strict";

// init model
const { TransactionModel } = require("../Model/Transaction");

class TransactionController {
  // show transaction
  static async ShowAllTransactionsController(req, res) {
    try {
      const result = await TransactionModel.ShowAllTransactionModel();

      if (result) {
        res.status(200).json({ message: result });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // show detail transaction
  static async ShowTransationByIdController(req,res) {
    const { id } = req.params;

    try {
      const result = await TransactionModel.ShowTransationByIdModel(+id);

      if (result) {
        res.status(200).json({ message: result });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // update status
  static async UpdateStatusTransactionController(req, res) {
    const { id } = req.params;
    const status = req.body.status;

    try {
      const result = await TransactionModel.UpdateStatusTransactionModel(
        status,
        +id
      );

      if (result) {
        res.status(200).json({ message: result });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = { TransactionController };
