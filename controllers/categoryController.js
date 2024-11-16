import categoryModels from "../models/categoryModels.js";
import { catchError, sendError } from "../utils/helper.js";

const addCategoryController = async (req,res) => {
    try {
        const {category_name} = req.body

        if (!category_name.trim()) {
            return sendError(res, "Category Name is missing!");
        }

        let category = await categoryModels.findOne({category_name})        

        if(category){
            return sendError(res, "Category Name is already exists");
        }

        category = new categoryModels({
            category_name
        })

        await category.save()

        res.status(200).send({
            success: true,
            message: "Category Added Successfully",
          });

    } catch (error) {
        console.error(error);
        catchError(res, "Error in Adding Categories", error);
    }
}

const getCategoryController = async (req,res) => {
    try {
       const categories = await categoryModels.find()
        res.status(200).send({
            success: true,
            message: "Category fetched Successfully",
            data: categories
          });

    } catch (error) {
        console.error(error);
        catchError(res, "Error in fetching Categories", error);
    }
}

const deleteCategoryController = async (req,res) => {
    try {

         const {id} = req.params

         if (!id) {
            return res.status(400).send({
              success: false,
              message: "Category ID is required",
            });
          }

        const deletedCategory = await categoryModels.findOneAndDelete({ _id: id });

        // Check if the category exists
        if (!deletedCategory) {
        return res.status(404).send({
            success: false,
            message: "Category not found",
        });
        }

        await categoryModels.findOneAndDelete({_id:id})
        res.status(200).send({
            success: true,
            message: "Category Deleted Successfully",
          });

    } catch (error) {
        console.error(error);
        catchError(res, "Error in deleting Categories", error);
    }
}

const editCategoryController = async (req,res) => {
    try {
        const {id} = req.params
        const {category_name} = req.body

        if (!id || !category_name.trim()) {
            return res.status(400).send({
                success: false,
                message: "Category ID and category name are required.",
            });
        }

        // Check if the category exists
        const existingCategory = await categoryModels.findById(id);
        if (!existingCategory) {
            return res.status(404).send({
                success: false,
                message: "Category not found.",
            });
        }

        // Check if the new category name already exists (to prevent duplicates)
        const duplicateCategory = await categoryModels.findOne({ category_name });
        if (duplicateCategory && duplicateCategory._id.toString() !== id) {
            return res.status(400).send({
                success: false,
                message: "Category name already exists.",
            });
        }

        // Update the category
        existingCategory.category_name = category_name;
        await existingCategory.save();

        // Send success response
        res.status(200).send({
            success: true,
            message: "Category updated successfully.",
            data: existingCategory,
        });
        
    } catch (error) {
        console.error(error);
        // Handle errors
        res.status(500).send({
            success: false,
            message: "Error in changing category.",
            error: error.message,
        });
    }
}

export { addCategoryController,getCategoryController,deleteCategoryController,editCategoryController };
