const express = require('express');
const { planning: ctrl } = require('../../controllers');
const { validationBody, ctrlWrapper, authenticate } = require("../../middlewares");
const { joiSchema } = require("../../models/planning");

const router = express.Router()

router.post('/', authenticate, validationBody(joiSchema), ctrlWrapper(ctrl.startPlanning));

router.get('/', authenticate, ctrlWrapper(ctrl.getPlanningByOwner));

router.put('/:planningId', authenticate, validationBody(joiSchema), ctrlWrapper(ctrl.updatePlanningPages));

router.delete('/:planningId', authenticate, ctrlWrapper(ctrl.deletePlanning));

module.exports = router;