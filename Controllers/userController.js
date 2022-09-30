const User = require("../Models/user");
const bcrypt = require("bcrypt");
// const user = require('../Models/user');
const jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
    User.findOne({
        email: req.body.email,
    }).then((user) => {
        if (user) {
            return res.status(409).json({
                error: "User already exists, please signin",
            });
        }
        bcrypt.hash(req.body.password, 10).then((hash) => {
            const user = new User({
                email: req.body.email,
                password: hash,
            });
            user.save()
                .then(() => {
                    res.status(201).json({
                        message: "User created successfully",
                    });
                })
                .catch((error) => {
                    res.status(500).json({
                        error: error,
                    });
                });
        });
    });
};

exports.signin = (req, res, next) => {
    User.findOne({
        email: req.body.email,
    })
        .then((user) => {
            if (!user) {
                return res.status(401).json({
                    error: "Invalid User entered!",
                });
            }
            bcrypt
                .compare(req.body.password, user.password)
                .then((valid) => {
                    if (!valid) {
                        return res.status(401).json({
                            error: new Error("Invalid password!"),
                        });
                    }
                    const token = jwt.sign(
                        {
                            userId: user._id,
                        },
                        "RANDOM_SECRET_STRING",
                        {
                            expiresIn: "24h",
                        }
                    );
                    res.status(200).json({
                        userId: user._id,
                        token: token,
                    });
                })
                .catch((error) => {
                    res.status(500).json({
                        error: error,
                    });
                });
        })
        .catch((error) => {
            res.status(500).json({
                error: error,
            });
        });
};
