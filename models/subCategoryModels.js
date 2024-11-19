import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema(
  {
    sub_category_name: {
      type: String,
      required: true,
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("SubCategory", subCategorySchema);
