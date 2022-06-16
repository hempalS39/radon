const jwt = require("jsonwebtoken");

 const tokenMid1 = function (req, res, next){ 
    let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];

    //If no token is present in the request header return error
    if (!token) return res.send({ status: false, msg: "token must be present" });


    let decodedToken = jwt.verify(token, "functionup-radon");
    if (!decodedToken){ 
    return res.send({ status: false, msg: "token is invalid" });}

    next()

 }

 const authMiddleware = function (req, res, next) {

      let token = req.headers["x-auth-token"];
      let  decodedToken = jwt.verify(token, "functionup-radon")
      let userToBeModified = req.params.userId
      let userLoggedIn = decodedToken.userId

      if(userToBeModified != userLoggedIn) return res.send({status: false, msg:"user loggedIn is not allowed to modified the requested user data" })
  
   next()
 }

 module.exports.tokenMid1 = tokenMid1
 module.exports.authMiddleware = authMiddleware