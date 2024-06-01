const express = require('express');
const validate = require('../../middlewares/validate');
const authValidation = require('../../validations/auth.validation');
const bookController = require('../../controllers/book.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/create',auth(), bookController.createBook);
router.post('/update',auth(), bookController.updateBook);
router.post('/',auth(), bookController.listBook);
router.post('/limit-less',auth(), bookController.listNoLimitBook);
router.get('/:bookId',auth(), bookController.getBook);
router.delete('/:bookId',auth(), bookController.deleteBook);

module.exports = router;