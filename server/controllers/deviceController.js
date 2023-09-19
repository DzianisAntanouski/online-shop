const { v4 } = require("uuid");
const { Device, DeviceInfo } = require("../models/models");
const path = require("path");
const ErrorHandler = require("../error/ErrorHandler");

class DeviceController {
    async create(req, res, next) {
        try {
            const { name, price, brandId, typeId } = req.body;

            const { img } = req.files;
            let fileName = v4() + ".jpg";
            img.mv(path.resolve(__dirname, "..", "static", fileName));

            const device = await Device.create({ name, price, brandId, typeId, img: fileName });

            let { info } = req.body;
            if (info) {
                info = JSON.parse(info);
                info.forEach((element) => {
                    DeviceInfo.create({
                        title: element.title,
                        description: element.description,
                        deviceId: device.id,
                    });
                });
            }

            res.json(device);
        } catch (e) {
            next(ErrorHandler.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        let { brandId, typeId, limit, page } = req.query;

        page = page || 1;
        limit = limit || 8;
        let offset = page * limit - limit;

        let devices;
        switch (true) {
            case !brandId && !typeId:
                devices = await Device.findAndCountAll({ limit, offset });
                break;

            case brandId && !typeId:
                devices = await Device.findAndCountAll({ where: { brandId }, limit, offset });
                break;

            case typeId && !brandId:
                devices = await Device.findAndCountAll({ where: { typeId }, limit, offset });
                break;

            default:
                devices = await Device.findAndCountAll({ where: { typeId, brandId }, limit, offset });
                break;
        }

        return res.json(devices);
    }

    async getOne(req, res) {
        const { id } = req.params;
        const device = await Device.findOne({ where: { id }, include: [{ model: DeviceInfo, as: "info" }] });
        return res.json(device);
    }
}

module.exports = new DeviceController();
