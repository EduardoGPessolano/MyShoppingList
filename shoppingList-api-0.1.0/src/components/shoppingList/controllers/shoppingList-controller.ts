import { Request, Response } from "express";
import { Repository } from "typeorm";
import { ShoppingList } from "../entities/shoppingList-entity";
import { Item } from "../entities/item-entity";
import { datasource } from "../../../config/datasource";
import { User } from "../entities/user-entity";

export class ShoppingListController {
  private shoppingListRepository: Repository<ShoppingList>;
  private itemRepository: Repository<Item>;

  constructor() {
    this.shoppingListRepository = datasource.getRepository(ShoppingList);
    this.itemRepository = datasource.getRepository(Item);
  }

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const newList = this.shoppingListRepository.create(req.body);
      await this.shoppingListRepository.save(newList);
      res.status(201).json(newList);
    } catch (error) {
      res.status(500).json({ message: "Error creating list", error });
    }
  };

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const lists = await this.shoppingListRepository.find({
        relations: ["createdBy", "items"],
      });
      res.status(200).json(lists);
    } catch (error) {
      res.status(500).json({ message: "Error fetching lists", error });
    }
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const listId = parseInt(req.params.id);
      const list = await this.shoppingListRepository.findOne({
        where: { list_id: listId },
        relations: { createdBy: true, items: true },
      });
      if (!list) {
        res.status(404).send("List not found");
      } else {
        res.status(200).json(list);
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching list", error });
    }
  };

  getByUserId = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = parseInt(req.params.userId);

      const lists = await this.shoppingListRepository.find({
        where: { createdBy: { user_id: userId } },
        relations: { createdBy: true, items: true },
      });

      if (!lists || lists.length === 0) {
        res.status(404).send("No lists found for this user");
      } else {
        res.status(200).json(lists);
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching lists", error });
    }
  };

  replace = async (req: Request, res: Response): Promise<void> => {
    try {
      const listId = parseInt(req.params.id);
      const existingList = await this.shoppingListRepository.findOneBy({
        list_id: listId,
      });

      if (!existingList) {
        res.status(404).send("List not found");
      } else {
        const updatedList = this.shoppingListRepository.create({
          ...existingList,
          ...req.body,
        });
        await this.shoppingListRepository.save(updatedList);
        res.status(200).json(updatedList);
      }
    } catch (error) {
      res.status(500).json({ message: "Error replacing list", error });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const listId = parseInt(req.params.id);
      const existingList = await this.shoppingListRepository.findOne({
        where: { list_id: listId },
        relations: ["items"],
      });

      if (!existingList) {
        res.status(404).send("List not found");
      } else {
        const updatedList = this.shoppingListRepository.merge(
          existingList,
          req.body
        );
        await this.shoppingListRepository.save(updatedList);
        res.status(200).json(updatedList);
      }
    } catch (error) {
      res.status(500).json({ message: "Error updating list", error });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const listId = parseInt(req.params.id);

      await this.shoppingListRepository.query(
        `DELETE FROM has WHERE list_id = $1`,
        [listId]
      );

      const result = await this.shoppingListRepository.delete(listId);

      if (result.affected === 0) {
        res.status(404).send("List not found");
      } else {
        res.status(204).send();
      }
    } catch (error) {
      res.status(500).json({ message: "Error deleting list", error });
    }
  };

  addItems = async (req: Request, res: Response): Promise<void> => {
    try {
      const listId = parseInt(req.params.id);
      const itemsData = req.body.items;

      const shoppingList = await this.shoppingListRepository.findOne({
        where: { list_id: listId },
        relations: ["items"],
      });

      if (!shoppingList) {
        res.status(404).send("List not found");
        return;
      }

      shoppingList.items.push(...itemsData);
      await this.shoppingListRepository.save(shoppingList);

      res.status(200).json(shoppingList);
    } catch (error) {
      res.status(500).json({ message: "Error adding items to list", error });
    }
  };

  deleteItems = async (req: Request, res: Response): Promise<void> => {
    try {
      const listId = parseInt(req.params.listId);
      const itemId = parseInt(req.params.itemId);

      const shoppingList = await this.shoppingListRepository.findOne({
        where: { list_id: listId },
        relations: ["items"],
      });

      if (!shoppingList) {
        res.status(404).send("List not found");
        return;
      }

      shoppingList.items = shoppingList.items.filter(
        (item) => item.item_id !== itemId
      );

      await this.shoppingListRepository.save(shoppingList);

      res.status(200).json(shoppingList);
    } catch (error) {
      res.status(500).json({ message: "Error removing item from list", error });
    }
  };
}
