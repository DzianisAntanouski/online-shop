const jwt = require("jsonwebtoken");

module.exports = function (role) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next();
        }

        try {
            const token = req.headers.authorization.split(" ")[1];
            if (!token) {
                return res.status(401).json({ message: "Wrong token" });
            }

            const decoded = jwt.verify(token, process.env.JWT_KEY);
            if (decoded.role !== role) {
                return res.status(403).json("Access forbidden");
            }
            req.user = decoded;
            next();
        } catch (e) {
            res.status(401).json({ message: "Access forbidden" });
        }
    };
};
