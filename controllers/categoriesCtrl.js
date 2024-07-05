import Category from "../models/Category.js";
import asyncHandler from "express-async-handler";

//@desc Create new category
// @route POST /api/v1/categories
//@access Private/Admin

export const createCategoryCtrl = asyncHandler(async (req, res) => {
  const { name } = req.body;

  //category exist
  const categoryFound = await Category.findOne({ name });
  if (categoryFound) {
    throw new Error("Category already exists");
  }
  //create
  const category = await Category.create({
    name: name.toLowerCase(),
    user: req.userAuthId,
  });

  res.json({
    status: "success",
    message: "Category created successfully",
    category,
  });
});

//@desc Get all categories
// @route GET /api/v1/categories
//@access Public

export const getCategoriesCtrl = asyncHandler(async (req, res) => {
  const categories = await Category.find();

  res.json({
    status: "success",
    message: "Categories fetched successfully",
    categories,
  });
});

//@desc Get single category
// @route GET /api/v1/categories/:id
//@access Public

export const getSingleCategoryCtrl = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  res.json({
    status: "success",
    message: "Category fetched successfully",
    category,
  });
});

//@desc  update category
//@route PUT /api/v1/category/:id/update
//@access Private/Admin

export const updateCategoryCtrl = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name,
    },
    { new: true }
  );

  if (!category) {
    throw new Error("Product not found");
  }
  res.json({
    status: "success",
    message: "Category updated successfully",
    category,
  });
});

//@desc  delete category
//@route DELETE /api/v1/category/:id/delete
//@access Private/Admin

export const deleteCategoryCtrl = asyncHandler(async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({
    status: "success",
    message: "Category deleted successfully",
  });
});
