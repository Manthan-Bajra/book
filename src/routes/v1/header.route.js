const express = require('express');
const validate = require('../../middlewares/validate');
const authValidation = require('../../validations/auth.validation');
const headerController = require('../../controllers/header.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/create',auth(), headerController.createHeader);
router.post('/',auth(), headerController.listHeader);
router.delete('/:headerId',auth(), headerController.deleteHeader);

module.exports = router;