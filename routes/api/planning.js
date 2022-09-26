const express = require('express');
const { planning: ctrl } = require('../../controllers');
const { validation, ctrlWrapper, authenticate } = require("../../middlewares");
const { joiSchema } = require("../../models/planning");

const router = express.Router()

router.post('/', authenticate, validation(joiSchema), ctrlWrapper(ctrl.startPlanning));
router.get('/:planningId', authenticate, ctrlWrapper(ctrl.getPlanning));

module.exports = router;