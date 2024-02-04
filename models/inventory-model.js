const pool = require("../database/index.js")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
  return await pool.query("SELECT * FROM public.classification")
}

/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.classification_id = $1`,
      [classification_id]
    )
    return data.rows
  } catch (error) {
    console.error("getclassificationsbyid error " + error)
  }
}

/* ***************************
 *  Get single inventory item from inv_id
 * ************************** */

async function getInventoryByInventoryId(inv_id) {
  try{
    const data = await pool.query(
      `SELECT * FROM public.inventory
      WHERE inventory.inv_id = $1`,
      [inv_id]
    )
    return data.rows
  } catch (error) {
    console.error("getinventorybyid error " + error)
  }
}

/* ***************************
 *  Add new classification to DB
 * ************************** */
async function addClassification (classification_name){
  try{
    console.log("Started query to class DB")
    await pool.query(
      `INSERT INTO public.classification (classification_name)
      VALUES ($1)`,
      [classification_name]
    )
    return true
  } catch (error) {
    console.error("addclassification error " + error)
  }
  }

  /* ***************************
 *  Add new Inventory item to the DB
 * ************************** */
async function addInventory(classification_id,
  inv_make,
  inv_model,
  inv_year,
  inv_description,
  inv_image,
  inv_thumbnail,
  inv_price,
  inv_miles,
  inv_color) {
    try {
      const sql = `INSERT INTO public.inventory (classification_id,
        inv_make,
        inv_model,
        inv_year,
        inv_description,
        inv_image,
        inv_thumbnail,
        inv_price,
        inv_miles,
        inv_color)
      VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
        )`
      const addInv = await pool.query(sql, 
        [classification_id,
        inv_make,
        inv_model,
        inv_year,
        inv_description,
        inv_image,
        inv_thumbnail,
        inv_price,
        inv_miles,
        inv_color])  
        
      return true
    } catch (error) {
      console.error("addinventory error " + error)
    }
  }



module.exports = {
  getClassifications, 
  getInventoryByClassificationId,
  getInventoryByInventoryId,
  addClassification,
  addInventory
};
