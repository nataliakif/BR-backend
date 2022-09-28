const express = require('express');
const { planning: ctrl } = require('../../controllers');
const { validationBody, ctrlWrapper, authenticate } = require("../../middlewares");
const { joiSchema, pagesSchema } = require("../../models/planning");

const router = express.Router()

router.post('/', authenticate, validationBody(joiSchema), ctrlWrapper(ctrl.startPlanning));

router.get('/:planningId', authenticate, ctrlWrapper(ctrl.getPlanning));

router.post(
    '/readStatistics',
    authenticate,
    validationBody(pagesSchema),
    ctrlWrapper(ctrl.updatePlanningPages)
);

module.exports = router;