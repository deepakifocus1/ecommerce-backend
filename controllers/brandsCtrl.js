import asyncHandler from "express-async-handler";
import Brand from "../models/Brand.js";

//@desc Create new brand
// @route POST /api/v1/brands
//@access Private/Admin

export const createBrandsCtrl = asyncHandler(async (req, res) => {
  const { name } = req.body;

  //brand exist
  const brandFound = await Brand.findOne({ name });
  if (brandFound) {
    throw new Error("Brand already exists");
  }
  //create
  const brand = await Brand.create({
    name: name.toLowerCase(),
    user: req.userAuthId,
  });

  res.json({
    status: "success",
    message: "Brand created successfully",
    brand,
  });
});

//@desc Get all brands
// @route GET /api/v1/brands
//@access Public

export const getBrandsCtrl = asyncHandler(async (req, res) => {
  const brands = await Brand.find();

  res.json({
    status: "success",
    message: "Brands fetched successfully",
    brands,
  });
});

//@desc Get single brand
// @route GET /api/v1/brands/:id
//@access Public

export const getSingleBrandCtrl = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);

  res.json({
    status: "success",
    message: "Brand fetched successfully",
    brand,
  });
});

//@desc  update brands
//@route PUT /api/v1/brands/:id/update
//@access Private/Admin

export const updateBrandCtrl = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const brand = await Brand.findByIdAndUpdate(
    req.params.id,
    {
      name,
    },
    { new: true }
  );

  if (!brand) {
    throw new Error("Brand not found");
  }
  res.json({
    status: "success",
    message: "Brand updated successfully",
    brand,
  });
});

//@desc  delete brands
//@route DELETE /api/v1/brands/:id/delete
//@access Private/Admin

export const deleteBrandCtrl = asyncHandler(async (req, res) => {
  await Brand.findByIdAndDelete(req.params.id);
  res.json({
    status: "success",
    message: "Brand deleted successfully",
  });
});
