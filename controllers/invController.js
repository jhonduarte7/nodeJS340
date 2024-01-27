const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}


/* *************************
 * Build inventory by Inventory ID view
 * ************************ */
invCont.buildByInventoryId = async function (req, res) {
  const id_car = req.params.inventoryId
  const data = await invModel.getInventoryByInventoryId(id_car)
  const show = await utilities.buildInventoryDisplay(data)
  let nav = await utilities.getNav()
  res.render("./inventory/vehicle", {
    title: `${data[0].inv_make} ${data[0].inv_model}`,
    nav,
    show
  })

}

module.exports = invCont