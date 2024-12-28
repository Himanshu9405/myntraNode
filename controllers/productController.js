import {
  catchError,
  createRandomBytes,
  sendError,
  errorHandler,
} from "../utils/helper.js";
import productModels from "../models/productModels.js";
import { v2 as cloudinary } from "cloudinary";

const addProductController = async (req, res) => {
  try {
    const {
      product_name,
      product_description,
      category_id,
      subcategory_id,
      out_of_stock,
      product_price,
      product_quantity,
    } = req.body;
    const { product_images } = req.files;

    if (!product_name || product_name.trim().length < 3) {
      return errorHandler(
        res,
        400,
        "Product name must be at least 3 characters long."
      );
    }

    if (!product_description || product_description.trim().length < 10) {
      return errorHandler(
        res,
        400,
        "Product description must be at least 10 characters long."
      );
    }

    if (!category_id || category_id.trim().length === 0) {
      return errorHandler(res, 400, "Category ID is required.");
    }

    if (!subcategory_id || subcategory_id.trim().length === 0) {
      return errorHandler(res, 400, "Subcategory ID is required.");
    }

    if (!product_price || isNaN(product_price) || product_price <= 0) {
      return errorHandler(res, 400, "Price must be a positive number.");
    }

    if (!product_quantity || isNaN(product_quantity) || product_quantity < 1) {
      return errorHandler(res, 400, "Quantity must be at least 1.");
    }

    if (out_of_stock === undefined || out_of_stock === null) {
      return errorHandler(res, 400, "Out of stock status is required.");
    }

    if (!product_images || product_images.length === 0) {
      return errorHandler(res, 400, "At least one product image is required.");
    }

    const allowedImageTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/jpg",
    ];
    const invalidImages = product_images.filter(
      (image) => !allowedImageTypes.includes(image.mimetype)
    );

    if (invalidImages.length > 0) {
      return errorHandler(
        res,
        400,
        "Only image files (JPEG, PNG, GIF, JPG) are allowed."
      );
    }

    const imageUrls = await Promise.all(
      product_images.map(async (image) => {
        try {
          const uploadResult = await cloudinary.uploader.upload(
            image.tempFilePath,
            {
              folder: "products",
            }
          );
          return uploadResult.secure_url;
        } catch (uploadError) {
          throw new Error("Error uploading image to Cloudinary.");
        }
      })
    );

    let product = new productModels({
      product_name,
      product_description,
      category_id,
      subcategory_id,
      out_of_stock,
      product_price,
      product_quantity,
      product_images: imageUrls,
    });

    await product.save();

    res.status(200).send({
      success: true,
      message: "Product Added Successfully",
    });
  } catch (error) {
    console.error(error);
    catchError(res, "Error in Adding Product", error);
  }
};

const getProductController = async (req, res) => {
  try {
    const products = await productModels.find();

    res.status(200).send({
      success: true,
      message: "Product fetched Successfully",
      data: products,
    });
  } catch (error) {
    console.error(error);
    catchError(res, "Error in Getting Product", error);
  }
};

export { addProductController, getProductController };
