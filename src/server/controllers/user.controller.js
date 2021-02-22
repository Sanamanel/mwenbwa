/* eslint-disable prettier/prettier */
/* eslint-disable arrow-parens */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
import User from "../models/user.model";
const {validationResult} = require("express-validator");

// eslint-disable-next-line no-unused-vars
exports.register = (req, res, next) => {
    bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
            const user = new User({
                email: req.body.email,
                username: req.body.username, 
                password: hash,
                color: req.body.color, 
            });

            user.save()
                .then(() =>
                    res.status(201).json({message: "Utilisateur créé !"}),
                )
                .catch((error) => res.status(400).json({error}));
        })
        .catch((error) => res.status(500).json({error}));
};

exports.login = (req, res, next) => {
    User.findOne({email: req.body.email})
        .then((user) => {
            if (!user) {
                return res
                    .status(401)
                    .json({error: "Utilisateur non trouvé !'"});
            }
            bcrypt
                .compare(req.body.password, user.password)
                // eslint-disable-next-line consistent-return
                // eslint-disable-next-line prettier/prettier
                .then((valid) => {
                    if (!valid) {
                        console.log("Login Not Ok");
                        return res
                            .status(401)
                            .json({error: "Mot de passe incorrect !"});
                    }
                    console.log("Login Ok");
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            {userId: user._id},
                            "RANDOM_TOKEN_SECRET",
                            {expiresIn: "24h"},
                        ),
                    });
                })
                .catch((error) => res.status(500).json({error}));
        })
        .catch((error) => res.status(500).json({error}));
};

exports.getRanks = (req, res, next) => {
    User.find({}, 'username leaves', 
        { skip:0, 
          limit:10, 
            sort: { leaves : 'desc' }})
         .then((ranks) => {
                console.log(ranks);
                return res
                       .status(200)
                       .json({ranks});
            })
        .catch((error) => res.status(500).json({error}));
};