import expressAsyncHandler from "express-async-handler";
import Review from "../models/Review.js";
import Product from "../models/Product.js";

//@desc  Create new review
//@route Post /api/v1/reviews
//@access Private/Admin

export const createReviewCtrl = expressAsyncHandler(async (req, res, next) => {
  const { message, rating } = req.body;
  // find the product
  const { productId } = req.params;
  const productFound = await Product.findById(productId).populate("reviews");
  if (!productFound) {
    throw new Error("Product Not Found");
  }
  //check if user already reivewed this product
  const hasReviewed = productFound?.reviews?.find((review) => {
    return review?.user.toString() === req.userAuthId.toString();
  });
  if (hasReviewed) {
    throw new Error("You have already reviewed this  product");
  }

  //create new review
  const review = await Review.create({
    message,
    rating,
    product: productFound?._id,
    user: req.userAuthId,
  });
  //push the review into product found
  productFound.reviews.push(review?._id);
  //resave
  await productFound.save();
  res.status(201).json({
    success: true,
    message: "Review created successfully",
  });
});
