import { getTokenFromHeader } from "../utils/getTokenFromHeader.js";
import { verifyToken } from "../utils/verfiyToken.js";

export const isLoggedIn = (req, res, next) => {
  //get token from header
  const token = getTokenFromHeader(req);
  //verfiy token
  const decodedUser = verifyToken(token);
  //save the user into req obj
  if (!decodedUser) {
    throw new Error("Invalid/Expired token, Please login again");
  }
  req.userAuthId = decodedUser?.id;
  next();
};
