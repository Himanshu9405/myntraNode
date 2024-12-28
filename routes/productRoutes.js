import express from 'express'
import {addProductController,getProductController} from "../controllers/productController.js"

// router object
const router = express.Router()

// routing

// ADD PRODUCTS || METHOD POST
router.post('/add_products',addProductController)

// GET PRODUCTS || METHOD GET
router.get('/get_products',getProductController)

export default router