import express from 'express'
import {addCategoryController,getCategoryController,deleteCategoryController,editCategoryController} from "../controllers/categoryController.js"

// router object
const router = express.Router()

// routing

// ADD CATEGORY || METHOD POST
router.post('/add_category',addCategoryController)

// GET CATEGORY || METHOD GET
router.get('/get_category',getCategoryController)

// DELETE CATEGORY || METHOD DELETE
router.delete('/delete_category/:id',deleteCategoryController)

// EDIT CATEGORY || METHOD PUT
router.put('/edit_category/:id',editCategoryController)

export default router