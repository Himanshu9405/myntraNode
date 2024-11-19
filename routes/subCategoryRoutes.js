import express from "express";
import {
  addSubCategoryController,
  deleteSubCategoryController,
  getSubCategoryController,
  getSubCategoryWithCategoryId,
  editSubCategoryController,
} from "../controllers/subCategoryController.js";

// router object
const router = express.Router();

// routing

// ADD SUB CATEGORY || METHOD POST
router.post("/add_sub_category", addSubCategoryController);

// DELETE SUB CATEGORY || METHOD DELETE
router.delete("/delete_sub_category/:id", deleteSubCategoryController);

// GET ALL SUB CATEGORY || METHOD GET
router.get("/get_sub_categories", getSubCategoryController);

// GET SUB CATEGORY WITH CATEGORY ID || METHOD GET
router.get("/get_sub_category/:category_id", getSubCategoryWithCategoryId);

// EDIT SUB CATEGORY || METHOD PATCH
router.patch("/edit_sub_category/:id", editSubCategoryController);

export default router;
