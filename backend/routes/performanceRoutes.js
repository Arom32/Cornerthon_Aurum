const express = require('express');
const router = express.Router();
const controller = require('../controllers/performance');


router.get('/', controller.getList);

router.get('/ranking', controller.getRanking);

router.get('/:id', controller.getDetail);

module.exports = router;