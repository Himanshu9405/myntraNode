import categoryModels from "../models/categoryModels.js";
import { catchError, sendError } from "../utils/helper.js";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUDNARY_API_KEY, 
    api_secret: process.env.CLOUDNARY_API_SECRET
});

const addCategoryController = async (req,res) => {
    try {
        const {category_name} = req.body
        const {category_image}= req.files

        if (!category_name.trim()) {
            return sendError(res, "Category Name is missing!");
        }

        if (!category_image) {
            return sendError(res, "Category Image is missing!");
        }

        let category = await categoryModels.findOne({category_name})        
        if(category){
            return sendError(res, "Category Name is already exists");
        }

        const uploadResult = await cloudinary.uploader.upload(category_image.tempFilePath)

        category = new categoryModels({
            category_name,
            category_image:uploadResult.url
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

const editCategoryController = async (req, res) => {
    try {
        const { id } = req.params; // Extract the category ID from the request params
        const { category_name } = req.body; // Extract category_name from the request body
        const category_image = req.files?.category_image; // Extract category_image from files (if provided)

        if (!id) {
            return res.status(400).send({
                success: false,
                message: "Category ID is required.",
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

        // Update `category_name` if provided
        if (category_name && category_name.trim()) {
            // Check if the new category name already exists (to prevent duplicates)
            const duplicateCategory = await categoryModels.findOne({ category_name });
            if (duplicateCategory && duplicateCategory._id.toString() !== id) {
                return res.status(400).send({
                    success: false,
                    message: "Category name already exists.",
                });
            }

            existingCategory.category_name = category_name.trim();
        }

        // Update `category_image` if provided
        if (category_image) {
            const uploadResult = await cloudinary.uploader.upload(category_image.tempFilePath);
            existingCategory.category_image = uploadResult.url; // Update the image URL in the database
        }

        // Save the updated category
        await existingCategory.save();

        res.status(200).send({
            success: true,
            message: "Category updated successfully.",
            data: existingCategory,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in updating category.",
            error: error.message,
        });
    }
};

export { addCategoryController,getCategoryController,deleteCategoryController,editCategoryController };
