import { Router } from "express";
import { UserController } from "../controllers/user-controller";
import authentication from "../../../middlewares/authentication";

const router = Router();
const userController = new UserController();

router.get("/", userController.getAll); //authentication.hasAuthentication
router.get("/:id", userController.getById);
router.post("/login", userController.loginUser);
router.post("/", userController.create);
router.put("/:id", userController.replace);
router.delete("/:id", userController.delete);
router.patch("/:id", userController.update);

export default router;
