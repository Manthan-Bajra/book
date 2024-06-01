const express = require('express');
const validate = require('../../middlewares/validate');
const authValidation = require('../../validations/auth.validation');
const shlokController = require('../../controllers/shlok.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/create',auth(), shlokController.createShlok);
router.post('/update',auth(), shlokController.updateShlok);
router.post('/',auth(), shlokController.listShlok);
router.post('/limit-less',auth(), shlokController.listNoLimitShlok);
router.get('/:shlokId',auth(), shlokController.getShlok);
router.delete('/:shlokId',auth(), shlokController.deleteShlok);

module.exports = router;