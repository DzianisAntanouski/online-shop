const ErrorHandler = require("../error/ErrorHandler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Basket } = require("../models/models");

const generateJwt = (id, email, role) => {
    return jwt.sign({ id, email, role }, process.env.JWT_KEY, { expiresIn: "10h" });
};

class UserController {
    async registration(req, res, next) {
        const { email, password, role } = req.body;
        if (!email || !password) {
            return next(ErrorHandler.badRequest("Email or password are incorrect!"));
        }
        const candidate = await User.findOne({ where: { email } });
        if (candidate) {
            return next(ErrorHandler.badRequest("User with this email was registered"));
        }

        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({ email, role, password: hashPassword });
        //! work with basket
        const basket = await Basket.create({ userId: user.id });

        const token = generateJwt(user.id, user.email, user.role);

        res.json({ token });
    }

    async login(req, res, next) {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(ErrorHandler.badRequest("Email or password are incorrect!"));
        }
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return next(ErrorHandler.badRequest(`Can\'t find user with this email: ${email}`));
        }

        let comparePass = bcrypt.compareSync(password, user.password);
        if (!comparePass) {
            return next(ErrorHandler.badRequest("Incorrect password"));
        }

        const token = generateJwt(user.id, user.email, user.role);
        return res.json({ token });
    }

    async check(req, res, next) {
        const { id, email, role } = req.user;
        const token = generateJwt(id, email, role);
        res.json({ token });
    }

    async getAll(req, res, next) {
        const users = await User.findAll();
        return res.json(users);
    }
}

module.exports = new UserController();
