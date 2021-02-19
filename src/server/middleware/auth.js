const jwt = require("jsonwebtoken");

module.exports = function auth(req, res, next) {
    const token = req.header("token");
    if (!token) {
        res.status(401).json({message: "Auth Error"});
        return;
    }

    try {
        const decoded = jwt.verify(token, "randomString");
        req.user = decoded.user;
        next();
    } catch (e) {
        console.error(e);
        res.status(500).send({message: "Invalid Token"});
    }
};
