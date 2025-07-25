const jwt = require("jsonwebtoken");

const authGuard = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (token || req.headers.authorization) {
      const decode = await jwt.verify(
        token || req.headers.authorization,
        process.env.TOKEN_SECRET
      );
      if (decode) {
        const user = {
          id: decode.id,
          email: decode.email,
        };
        req.user = user;
        next();
      }
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized access" });
    }
  } catch (error) {
    console.error("❌ Auth Guard Error:", error);
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized access" });
  }
};
module.exports = { authGuard };
