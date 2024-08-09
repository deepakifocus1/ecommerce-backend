import Order from "../models/Order.js";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import Product from "../models/Product.js";

//@desc create orders
//@route POST /api/v1/orders
//@access private
export const createOrderCtrl = asyncHandler(async (req, res, next) => {
  //get the payload(customer, orderitems,shippingAddress, totalPrice)
  const { orderItems, shippingAddress, totalPrice } = req.body;

  //find the user
  const user = await User.findById(req.userAuthId);
  //check if order is not empty
  if (orderItems?.length <= 0) {
    throw new Error("No Order Items");
  }
  //place/create order save into db
  const order = await Order.create({
    user: user?._id,
    orderItems,
    shippingAddress,
    totalPrice,
  });
  //push order into user
  user.orders.push(order?._id);
  await user.save();
  //update the product qty and qtySold
  const products = await Product.find({ _id: { $in: orderItems } });

  orderItems?.map(async (order) => {
    const product = products?.find((product) => {
      return product?._id.toString() === order?._id.toString();
    });
    if (product) {
      product.totalSold += order.qty;
    }
    await product.save();
  });
  //make payment(stripe)
  //payment webhook
  //update the user order
});
