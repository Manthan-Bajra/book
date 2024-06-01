const express = require('express');
const validate = require('../../middlewares/validate');
const authValidation = require('../../validations/auth.validation');
const pageController = require('../../controllers/page.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/create',auth(), pageController.createPage);
router.post('/update',auth(), pageController.updatePage);
router.post('/',auth(), pageController.listPage);
router.get('/:pageId',auth(), pageController.getPage);
router.delete('/:pageId',auth(), pageController.deletePage);

module.exports = router;