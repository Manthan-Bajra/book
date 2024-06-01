const express = require('express');
const validate = require('../../middlewares/validate');
const authValidation = require('../../validations/auth.validation');
const sthanController = require('../../controllers/sthan.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/create',auth(), sthanController.createSthan);
router.post('/update',auth(), sthanController.updateSthan);
router.post('/',auth(), sthanController.listSthan);
router.post('/limit-less',auth(), sthanController.listNoLimitSthan);
router.get('/:sthanId',auth(), sthanController.getSthan);
router.delete('/:sthanId',auth(), sthanController.deleteSthan);

module.exports = router;