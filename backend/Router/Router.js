'use strict'

// init express
const express = require('express');
const router = express.Router();

// init other router
const { userRouter } = require('./UserRouter');
const { printerRouter } = require('./PrinterRouter');
const { transactionRouter  } = require('./TransactionRouter');

// init controller
const { Controller } = require('../Controller/Controller');

// test get
router.get('/', Controller.Homepage);
router.use(userRouter);
router.use(printerRouter);
router.use(transactionRouter);

module.exports = { router };