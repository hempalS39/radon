const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

//<--------------------------createApi-------------------------------------->
const createUser = async function (abcd, xyz) {
 
  let data = abcd.body;
  let savedData = await userModel.create(data);
  console.log(abcd.newAtribute);
  xyz.send({ msg: savedData });
};

//<--------------------------loginApi-------------------------------------->

const loginUser = async function (req, res) {
  let userName = req.body.emailId;
  let password = req.body.password;

  let user = await userModel.findOne({ emailId: userName, password: password });
  if (!user)
    return res.send({
      status: false,
      msg: "username or the password is not corerct",
    });

  // Once the login is successful, create the jwt token with sign function
  // Sign function has 2 inputs:
  // Input 1 is the payload or the object containing data to be set in token
  // The decision about what data to put in token depends on the business requirement
  // Input 2 is the secret
  // The same secret will be used to decode tokens
  let token = jwt.sign(
    {
      userId: user._id.toString(),
      batch: "radon",
      organisation: "FunctionUp",
    },
    "functionup-radon"
  );
  // res.setHeader("x-auth-token", token);
  res.send({ status: true, token: token });
};


//<--------------------------getUserDataApi-------------------------------------->

// const getUserData = async function (req, res) {
  // let token = req.headers["x-Auth-token"];
  // if (!token) token = req.headers["x-auth-token"];

  // //If no token is present in the request header return error
  // if (!token) return res.send({ status: false, msg: "token must be present" });

  // console.log(token);
  
  // // If a token is present then decode the token with verify function
  // // verify takes two inputs:
  // // Input 1 is the token to be decoded
  // // Input 2 is the same secret with which the token was generated
  // // Check the value of the decoded token yourself
  // let decodedToken = jwt.verify(token, "functionup-radon");
  // if (!decodedToken)
  //   return res.send({ status: false, msg: "token is invalid" });
const getUserData = async function (req, res) {


  //authorization
  let token = req.headers["x-auth-token"];
  let  decodedToken = jwt.verify(token, "functionup-radon")
  let userToBeModified = req.params.userId
  let userLoggedIn = decodedToken.userId

  if(userToBeModified != userLoggedIn) return res.send({status: false, msg:"user loggedIn is not allowed to modified the requested user data" })
  // let user = await userModel.findById(req.params.userId)



  let userId = req.params.userId;
  let userDetails = await userModel.findById(userId);
  if (!userDetails)
    return res.send({ status: false, msg: "No such user exists" });

  res.send({ status: true, data: userDetails });
};


//<--------------------------updateUserApi-------------------------------------->

const updateUser = async function (req, res) {
  

  let token = req.headers["x-auth-token"];
  let  decodedToken = jwt.verify(token, "functionup-radon")
  let userToBeModified = req.params.userId
  let userLoggedIn = decodedToken.userId

  if(userToBeModified != userLoggedIn) return res.send({status: false, msg:"user loggedIn is not allowed to modified the requested user data" })
  // let user = await userModel.findById(req.params.userId)

  let userId = req.params.userId;
  let user = await userModel.findById(userId);
  //Return an error if no user with the given id exists in the db
  if (!user) {
    return res.send("No such user exists");
  }

  let userData = req.body;
  console.log(userData)
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId },  userData , {new: true});
  res.send({ status: true, data: updatedUser });
};


//<--------------------------deleteUserApi-------------------------------------->

const deleteUser = async function (req , res) {
  

  let token = req.headers["x-auth-token"];
  let  decodedToken = jwt.verify(token, "functionup-radon")
  let userToBeModified = req.params.userId
  let userLoggedIn = decodedToken.userId

  if(userToBeModified != userLoggedIn) return res.send({status: false, msg:"user loggedIn is not allowed to modified the requested user data" })
  

  let userId = req.params.userId
  let user = await userModel.findById(userId)
  if(!user){
    return res.send({status: false, msg: " no such user present"})
  }
  console.log(user)
  let updatedUser = await userModel.findOneAndUpdate({_id: userId},{isDeleted: true},{new: true}) 
  console.log(updatedUser)
  res.send({status: true, isDeleted : updatedUser.isDeleted})

}

module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser;

