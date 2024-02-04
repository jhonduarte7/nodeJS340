const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
const utilities = require("../utilities/");

// Route to inventory management page
router.get("/", 
utilities.handleErrors(invController.buildManagement));


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
router.get("/newClassification", 

utilities.handleErrors(invController.buildAddClassification));

// route to build Add Inventory View
router.get("/newinv", 
utilities.handleErrors(invController.buildAddInventory)) 



module.exports = router;
