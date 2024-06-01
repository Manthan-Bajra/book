const express = require('express');
const validate = require('../../middlewares/validate');
const authValidation = require('../../validations/auth.validation');
const chapterController = require('../../controllers/chapter.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/create',auth(), chapterController.createChapter);
router.post('/update',auth(), chapterController.updateChapter);
router.post('/',auth(), chapterController.listChapter);
router.post('/limit-less',auth(), chapterController.listNoLimitChapter);
router.get('/:chapterId',auth(), chapterController.getChapter);
router.delete('/:chapterId',auth(), chapterController.deleteChapter);

module.exports = router;