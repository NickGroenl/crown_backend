const express = require("express");
const { body, header } = require("express-validator");
const router = express.Router();

const { validateRequest } = require("../middleware/validateRequest");
const  user = require("../controllers/user");
const { validateJWT } = require("../middleware/validateJWT");

router.post("/login", 
    body("email").isEmail().withMessage("Email is invalid"),
    body("password").isString().withMessage("Password is invalid"),
    validateRequest,
    user.login
);
router.post("/register", 
    body("email").isEmail().withMessage("Email is invalid"),
    body("password").isString().withMessage("Password is invalid"),
    validateRequest,
    user.register
);
router.get("/configure", validateJWT, user.configure);



module.exports = router;