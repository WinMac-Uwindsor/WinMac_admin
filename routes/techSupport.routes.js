const express = require('express');
const techSupportController = require('../controller/techSupport.controller');
const router = express.Router();

router.route('/').get(techSupportController.getAllTickets);

router.route('/deleteTicket').post(techSupportController.deleteTicket);

module.exports = router;
