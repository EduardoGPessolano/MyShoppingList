import { Router } from "express";
import { ShoppingListController } from "../controllers/shoppingList-controller";
import { authenticateJWT } from "../../../middlewares/auth";
import authentication from "../../../middlewares/authentication";

const router = Router();
const shoppingListController = new ShoppingListController();

router.get("/", shoppingListController.getAll);
router.get("/:id", shoppingListController.getById);
router.get(
  "/user/:userId",
  authentication.hasAuthentication,
  shoppingListController.getByUserId
);
router.post(
  "/",
  authentication.hasAuthentication,
  shoppingListController.create
);
router.put("/:id", shoppingListController.replace);
router.patch(
  "/:id",
  authentication.hasAuthentication,
  shoppingListController.update
);
router.delete(
  "/:id",
  authentication.hasAuthentication,
  shoppingListController.delete
);

router.post(
  "/:id/items",
  authentication.hasAuthentication,
  shoppingListController.addItems
);

router.delete(
  "/:listId/items/:itemId",
  authentication.hasAuthentication,
  shoppingListController.deleteItems
);

export default router;
