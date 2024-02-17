const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
const utilities = require("../utilities/");
const manValidate = require("../utilities/management-validation");

// Route to inventory management page
router.get(
  "/",
  utilities.checkLogin,
  utilities.checkAccountType,
  utilities.handleErrors(invController.buildManagement)
);

// Route to build inventory by classification view
router.get(
  "/type/:classificationId",
  utilities.handleErrors(invController.buildByClassificationId)
);

// Route to build individual vehicle view
router.get(
  "/detail/:inventoryId",
  utilities.handleErrors(invController.buildByInventoryId)
);

// Route to add new classification
router.post(
  "/newClassification",
  utilities.handleErrors(invController.addClassification)
);

// Route to add new inventory
router.post(
  "/newinv",

  utilities.handleErrors(invController.addNewInventory)
);

// Route to build Add Classification View
router.get(
  "/newClassification",

  utilities.handleErrors(invController.buildAddClassification)
);

// route to build Add Inventory View
router.get("/newinv", utilities.handleErrors(invController.buildAddInventory));

// Route to fetch inventory by classification for the inventory management view
router.get(
  "/getInventory/:classification_id",
  utilities.handleErrors(invController.getInventoryJSON)
);

// Route to modify inventory from inventory management view
router.get(
  "/edit/:inv_id",
  utilities.handleErrors(invController.buildEditInventory)
);

// Route to update vehicle info
router.post(
  "/update/",
  manValidate.newInventoryRules(),
  utilities.handleErrors(invController.updateInventory)
);

// Route to delete inventory item
router.get(
  "/delete/:inv_id",
  utilities.handleErrors(invController.buildDeleteView)
);

// Route to delete inventory
router.post("/delete/", utilities.handleErrors(invController.deleteInventory));

module.exports = router;
