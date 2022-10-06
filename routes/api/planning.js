const express = require("express");
const { planning: ctrl } = require("../../controllers");
const {
  validationBody,
  ctrlWrapper,
  authenticate,
  checkProtocol,
} = require("../../middlewares");
const { joiSchema } = require("../../models/planning");

const router = express.Router();

router.post(
  "/",
  checkProtocol,
  authenticate,
  validationBody(joiSchema),
  ctrlWrapper(ctrl.startPlanning)
);

router.get(
  "/",
  checkProtocol,
  authenticate,
  ctrlWrapper(ctrl.getPlanningByOwner)
);

router.put(
  "/:planningId",
  checkProtocol,
  authenticate,
  validationBody(joiSchema),
  ctrlWrapper(ctrl.updatePlanningPages)
);

router.delete(
  "/:planningId",
  checkProtocol,
  authenticate,
  ctrlWrapper(ctrl.deletePlanning)
);

module.exports = router;
