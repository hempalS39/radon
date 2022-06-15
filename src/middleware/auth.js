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

 module.exports.tokenMid1 = tokenMid1