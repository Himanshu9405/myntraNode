import categoryModels from "../models/categoryModels.js";
import subCategoryModels from "../models/subCategoryModels.js";
import { catchError } from "../utils/helper.js";

const addSubCategoryController = async (req, res) => {
  try {
    const { sub_category_name, category_id } = req.body;

    if (!sub_category_name.trim()) {
      return res
        .status(400)
        .send({ success: false, message: "SubCategory Name is required" });
    }

    if (!category_id) {
      return res
        .status(400)
        .send({ success: false, message: "Category Id is required" });
    }

    const category = categoryModels.find({ _id: category_id });

    if (!category) {
      return res
        .status(404)
        .send({ success: false, message: "Category not found" });
    }

    const subCategory = new subCategoryModels({
      sub_category_name,
      category_id,
    });

    await subCategory.save();

    res.status(201).send({
      success: true,
      message: "SubCategory added successfully",
      data: subCategory,
    });
  } catch (error) {
    console.error(error);
    catchError(res, "Error in Adding Sub Categories", error);
  }
};

const deleteSubCategoryController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .send({ success: false, message: "SubCategory ID is required" });
    }

    const deleteSubCategory = await subCategoryModels.findById({ _id: id });

    if (!deleteSubCategory) {
      return res.status(404).send({
        success: false,
        message: "SubCategory not found",
      });
    }

    await subCategoryModels.findOneAndDelete({ _id: id });

    res.status(200).send({
      success: true,
      message: "SubCategory Deleted Successfully",
    });
  } catch (error) {
    console.error(error);
    catchError(res, "Error in Deleting SubCategories", error);
  }
};

const getSubCategoryController = async (req, res) => {
  try {
    const subCategories = await subCategoryModels.find();

    res.status(200).send({
      success: true,
      message: "SubCategory fetched Successfully",
      data: subCategories,
    });
  } catch (error) {
    console.error(error);
    catchError(res, "Error in Getting SubCategories", error);
  }
};

const getSubCategoryWithCategoryId = async (req, res) => {
  try {
    const { category_id } = req.params;

    if (!category_id) {
      return res.status(400).send({
        success: false,
        message: "Category ID is required",
      });
    }

    const subCategories = await subCategoryModels.find({ category_id });

    if (subCategories.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No subcategories found for the given category ID",
      });
    }

    res.status(200).send({
      success: true,
      message: "Subcategories fetched successfully",
      data: subCategories,
    });
  } catch (error) {
    console.error(error);
    catchError(res, "Error in Getting SubCategories", error);
  }
};

const editSubCategoryController = async (req,res) => {
 try {
    const { id } = req.params;
    const { sub_category_name } = req.body;

    if(!id){
        return res.status(400).send({
            success:false,
            message:"SubCategory ID is required"
        })
    }

    if(!sub_category_name || !sub_category_name.trim()){
        return res.status(400).send(
            {
                success: false,
                message:"Sub category name is missing"
            }
        )
    }

    const findSubCategory = await subCategoryModels.findById({_id:id})

    if(!findSubCategory){
        return res.status(404).send({
            success:false,
            message: "SubCategory not found"
        })
    }

    findSubCategory.sub_category_name = sub_category_name.trim();
    await findSubCategory.save();

    res.status(200).send({
        success: true,
        message: "SubCategory updated successfully",
        data: findSubCategory,
      });

    
 } catch (error) {
    console.error(error);
    catchError(res, "Error in Editing SubCategories", error);
 }
}

export {
  addSubCategoryController,
  deleteSubCategoryController,
  getSubCategoryController,
  getSubCategoryWithCategoryId,
  editSubCategoryController
};
