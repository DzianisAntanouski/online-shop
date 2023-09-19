const { Type } = require("../models/models");
const ErrorHandler = require("../error/ErrorHandler");

class TypeController {
    async create(req, res) {
        try {
            const { name } = req.body;
            const type = await Type.create({ name });
            return res.json(type);
        } catch (e) {
            console.log(e.message);
        }
    }

    async getAll(req, res) {
        const types = await Type.findAll();
        return res.json(types);
    }
}

module.exports = new TypeController();
