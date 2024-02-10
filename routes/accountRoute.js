// Needed Resources 
const express = require("express")
const router = new express.Router() 
const accountController = require("../controllers/accountController")
const utilities = require("../utilities/")
const regValidate = require('../utilities/account-validation')


// Route to login view
router.get("/login", utilities.handleErrors(accountController.buildLogin));

// Route to registration view
router.get("/registration", utilities.handleErrors(accountController.buildRegister));

// Route to register new account
router.post("/register",
regValidate.registrationRules(),
regValidate.checkRegData,
utilities.handleErrors(accountController.registerAccount));


// Process the login attempt
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
)

// Route to account view
router.get("/", 
utilities.checkLogin, 
utilities.handleErrors(accountController.buildAccount))


module.exports = router;