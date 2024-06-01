const express = require('express');
const validate = require('../../middlewares/validate');
const authValidation = require('../../validations/auth.validation');
const planController = require('../../controllers/plan.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/create',auth(), planController.createPlan);
router.post('/update',auth(), planController.updatePlan);
router.post('/',auth(), planController.listPlan);
router.patch('/:planId',auth(), planController.activePlan);
router.get('/:planId',auth(), planController.getPlan);
router.delete('/:planId',auth(), planController.deletePlan);

module.exports = router;