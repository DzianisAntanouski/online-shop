const { Brand } = require("../models/models");

class BrandController {
    async create(req, res) {
        try {
            const { name } = req.body;
            const brand = await Brand.create({ name });
            return res.json(brand);
        } catch (e) {
            console.log(e.message);
        }
    }
    async getAll(req, res) {
        const brands = await Brand.findAll();
        return res.json(brands);
    }
}

module.exports = new BrandController();
