let _ = require("lodash");
const User = require("../models/user");
const {generateJWT} = require("../libs/jwt");
exports.login = async (req, res) => {
    try {
        let user = await User.findOne({
          email: req.body.email,
        });
        if (user) {
            let isUserAuthenticated = user.validatePassword(
                req.body.password,
                user.password
            );
            if (isUserAuthenticated) {
                
                const token = generateJWT({ userId: user._id });
                user.token = token;
                return res.status(200)
                .cookie("access-token", token, {
                    sameSite: "strict",
                    path: "/",
                    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
                    httpOnly: true,
                })
                .json({
                    status: 200,
                    data: _.pick(user, User.returnable),
                });
            } else {
                return res.status(400).json({
                status: 400,
                message: "Password is incorrect",
                });
            
            } 
        }
        return res.status(400).json({
            status: 400,
            message: "No account exist",
        });
    } catch (err) {
        console.log(err);
        return res.status(400).json({
          message: "No account exist",
          err,
        });
    }
}
exports.register = async (req, res) =>{
    try {
        let {email, password} = req.body;
        let user = new User();
        user.email = email;
        user.password = user.generatePasswordHash(password);
        user.nickname = (Math.random() + 1).toString(36).substring(7);
        user = await user.save();
        user = _.pick(user, User.returnable);
        return res.status(200).json({
            data: user,
        });
    } catch (err) {
        console.log(err);
        return res.status(400).json({
          message: "Some error occured",
          err,
        });
    }
}


exports.configure = async (req, res) =>{
    const user = req.user;
    const { address, dni } = req.body;

    try{
        address && (user.address = address)
        dni && (user.dni = dni)

        await user.save();

        return res.status(200).json({
            data: user,
        });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({
          message: "Some error occured",
          err,
        });
    }
}