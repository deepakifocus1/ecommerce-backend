import asyncHandler from "express-async-handler";
import Product from "../models/Product.js";

//@desc  Create new product
//@route Post /api/v1/products
//@access Private/Admin
export const createProductCtrl = asyncHandler(async (req, res) => {
  const {
    name,
    brand,
    description,
    category,
    sizes,
    colors,
    user,
    price,
    totalQty,
  } = req.body;

  //Product exist
  const productExist = await Product.findOne({ name });
  if (productExist) {
    throw new Error("Product Already Exits");
  }
  //create new product
  const product = await Product.create({
    name,
    description,
    category,
    sizes,
    colors,
    brand,
    user: req.userAuthId,
    price,
    totalQty,
  });
  //push the product into category
  //send the response
  res.status(201).json({
    status: "success",
    message: "Product created successfully",
    data: product,
  });
});

//@desc  Get all product
//@route GET /api/v1/products
//@access Public

export const getProductsCtrl = asyncHandler(async (req, res) => {
  //query
  let productQuery = Product.find();

  //search by name
  if (req.query.name) {
    productQuery = productQuery.find({
      name: { $regex: req.query.name, $options: "i" },
    });
  }

  //filter by brand
  if (req.query.brand) {
    productQuery = productQuery.find({
      brand: { $regex: req.query.brand, $options: "i" },
    });
  }

  //filter by category
  if (req.query.category) {
    productQuery = productQuery.find({
      category: { $regex: req.query.category, $options: "i" },
    });
  }

  //filter by color
  if (req.query.color) {
    productQuery = productQuery.find({
      color: { $regex: req.query.color, $options: "i" },
    });
  }

  //await the query
  const products = await productQuery;

  res.status(200).json({
    status: "success",
    data: products,
  });
});
