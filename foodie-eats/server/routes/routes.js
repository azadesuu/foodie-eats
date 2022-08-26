const User = require("../models/user");

// Get  one customer info
const getUserInfo = async (req, res, next) => {
  try {
    const userInfo = await User.findOne({
      _id: req.params.id,
    }).lean();

    if (!userInfo) {
      next({ name: "CastError" });
      return;
    }
    res.status(200).json({
      success: true,
      data: customerInfo,
    });
  } catch (err) {
    next(err);
  }
};
