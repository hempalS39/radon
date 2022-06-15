const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const authMiddleware= require("../middleware/auth.js")


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/users", userController.createUser  )

router.post("/login", userController.loginUser)

//The userId is sent by front end
router.get("/usersdata/:userId",authMiddleware.tokenMid1, userController.getUserData)

router.put("/update/:userId",authMiddleware.tokenMid1, userController.updateUser)

router.delete("/delete/:userId",authMiddleware.tokenMid1, userController.deleteUser)


module.exports = router;