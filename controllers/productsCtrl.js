import asyncHandler from "express-async-handler";
import Product from "../models/Product.js";
import Category from "../models/Category.js";
import Brand from "../models/Brand.js";

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
  //find the category
  const categoryFound = await Category.findOne({ name: category });
  if (!categoryFound) {
    throw new Error(
      "Category not found, please create category first or check category name"
    );
  }
  //find the brand
  const brandFound = await Brand.findOne({ name: brand.toLowerCase() });
  if (!brandFound) {
    throw new Error(
      "Brand not found, please create brand first or check brand name"
    );
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
  categoryFound.products.push(product._id);
  //resave
  await categoryFound.save();

  //push the product into brand
  brandFound.products.push(product._id);
  //resave
  await brandFound.save();
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

// export const getProductsCtrl = asyncHandler(async (req, res) => {
//   //query
//   let productQuery = Product.find();

//   //search by name
//   if (req.query.name) {
//     productQuery = productQuery.find({
//       name: { $regex: req.query.name, $options: "i" },
//     });
//   }

//   //filter by brand
//   if (req.query.brand) {
//     productQuery = productQuery.find({
//       brand: { $regex: req.query.brand, $options: "i" },
//     });
//   }

//   //filter by category
//   if (req.query.category) {
//     productQuery = productQuery.find({
//       category: { $regex: req.query.category, $options: "i" },
//     });
//   }

//   //filter by color
//   if (req.query.color) {
//     productQuery = productQuery.find({
//       color: { $regex: req.query.color, $options: "i" },
//     });
//   }

//   //filter by size
//   if (req.query.size) {
//     productQuery = productQuery.find({
//       color: { $regex: req.query.size, $options: "i" },
//     });
//   }

//   //filter by price range
//   if (req.query.price) {
//     const priceRange = req.query.price.split("-");
//     //gte : greater or equal
//     //lte : less than or equal to
//     productQuery = productQuery.find({
//       price: { $gte: priceRange[0], $lte: priceRange[1] },
//     });
//   }

//   //pagination
//   //page
//   const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
//   //limit
//   const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10;
//   //startIndex
//   const startIndex = (page - 1) * limit;
//   //endIndex
//   const endIndex = page * limit;
//   //totalProducts
//   const total = await Product.countDocuments();

//   productQuery = await productQuery.skip(startIndex).limit(limit);

//   // pagination results
//   const pagination = {};
//   if (endIndex < total) {
//     pagination.next = {
//       page: page + 1,
//       limit,
//     };
//     if (startIndex > 0) {
//       pagination.prev = {
//         page: page - 1,
//         limit,
//       };
//     }
//   }
//   //await the query
//   const products = await productQuery;

//   res.status(200).json({
//     status: "success",
//     total,
//     results: products.length,
//     pagination,
//     message: "Products fetched successfully",
//     products,
//   });
// });

export const getProductsCtrl = asyncHandler(async (req, res) => {
  console.log(req.query);
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
      colors: { $regex: req.query.color, $options: "i" },
    });
  }

  //filter by size
  if (req.query.size) {
    productQuery = productQuery.find({
      sizes: { $regex: req.query.size, $options: "i" },
    });
  }
  //filter by price range
  if (req.query.price) {
    const priceRange = req.query.price.split("-");
    //gte: greater or equal
    //lte: less than or equal to
    productQuery = productQuery.find({
      price: { $gte: priceRange[0], $lte: priceRange[1] },
    });
  }
  //pagination
  //page
  const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
  //limit
  const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10;
  //startIdx
  const startIndex = (page - 1) * limit;
  //endIdx
  const endIndex = page * limit;
  //total
  const total = await Product.countDocuments();

  productQuery = productQuery.skip(startIndex).limit(limit);

  //pagination results
  const pagination = {};
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  //await the query
  const products = await productQuery.populate("reviews");
  res.json({
    status: "success",
    total,
    results: products.length,
    pagination,
    message: "Products fetched successfully",
    products,
  });
});

//@desc  Get single product
//@route GET /api/v1/products/:id
//@access Public

export const getProductCtrl = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate("reviews");
  if (!product) {
    throw new Error("Product not found");
  }
  res.json({
    status: "success",
    message: "Product fetched successfully",
    product,
  });
});

//@desc  update product
//@route PUT /api/v1/products/:id/update
//@access Private/Admin

export const updateProductCtrl = asyncHandler(async (req, res) => {
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

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name,
      brand,
      description,
      category,
      sizes,
      colors,
      user,
      price,
      totalQty,
    },
    { new: true }
  );

  if (!product) {
    throw new Error("Product not found");
  }
  res.json({
    status: "success",
    message: "Product updated successfully",
    product,
  });
});

//@desc  delete product
//@route DELETE /api/v1/products/:id/delete
//@access Private/Admin

export const deleteProductCtrl = asyncHandler(async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({
    status: "success",
    message: "Product deleted successfully",
  });
});
