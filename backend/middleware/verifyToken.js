const asyncHandler = require("express-async-handler")
const jwt = require ("jsonwebtoken")

const validToken = asyncHandler(async (req,res, next)=>{
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1]
        try {
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            req.user = decoded.user;
            next();
        } catch (err) {
            if (err.name === "TokenExpiredError") {
              return res.status(401).json({ status: "error", message: "Expired Token" });
            }
            return res.status(401).json({ status: "error", message: "Invalid token, Please Login Again" });
          }
        } else {
          return res.status(401).json({ status: "error", message: "Not Authorized" });
        }
      });
 

module.exports = validToken;