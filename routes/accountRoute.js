// Needed Resources
const express = require("express");
const router = new express.Router();
const accountController = require("../controllers/accountController");
const utilities = require("../utilities/");
const regValidate = require("../utilities/account-validation");

// Route to login view
router.get("/login", utilities.handleErrors(accountController.buildLogin));

// Route to registration view
router.get(
  "/registration",
  utilities.handleErrors(accountController.buildRegister)
);

// Route to register new account
router.post(
  "/register",
  regValidate.registrationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
);

// Process the login attempt
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
);

// Route to account view
router.get(
  "/",
  utilities.checkLogin,
  utilities.handleErrors(accountController.buildAccount)
);

// Logout the user
router.get("/logout", utilities.handleErrors(accountController.logoutUser));

// Route to update account view
router.get(
  "/update/:account_id",
  utilities.checkLogin,
  utilities.handleErrors(accountController.buildUpdateAccount)
);

// Process update account info
router.post(
  "/updateinfo",
  utilities.checkLogin,
  regValidate.updateAccountRules(),
  regValidate.checkAccountData,
  utilities.handleErrors(accountController.updateAccount)
);

// Process update password
router.post(
  "/updatepw",
  utilities.checkLogin,
  regValidate.updatePasswordRules(),
  regValidate.checkPasswordData,
  utilities.handleErrors(accountController.updatePassword)
);

module.exports = router;
