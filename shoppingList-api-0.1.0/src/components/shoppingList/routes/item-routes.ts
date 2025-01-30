import { Router } from "express";
import { ItemController } from "../controllers/item-controller";
import authentication from "../../../middlewares/authentication";

const router = Router();
const itemController = new ItemController();

router.get("/", authentication.hasAuthentication, itemController.getAll);
router.get("/:id", itemController.getById);
router.post("/", itemController.create);
router.put("/:id", itemController.replace);
router.patch("/:id", itemController.update);
router.delete("/:id", itemController.delete);

export default router;
