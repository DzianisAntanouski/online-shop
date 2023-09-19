const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const checkRole = require("../middleware/CheckRoleMiddleware");

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.get("/auth", AuthMiddleware, userController.check);
router.get("/getUsers", checkRole("ADMIN"), userController.getAll);

module.exports = router;
