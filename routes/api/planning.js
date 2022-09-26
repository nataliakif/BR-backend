const express = require('express');
const { planning: ctrl } = require('../../controllers');
const { validation, ctrlWrapper } = require("../../middlewares");
const { joiSchema } = require("../../models/planning");

const router = express.Router()

router.post('/', validation(joiSchema), ctrlWrapper(ctrl.startPlanning));

module.exports = router;