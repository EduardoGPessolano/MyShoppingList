import { Request, Response } from "express";
import { Repository } from "typeorm";
import { Item } from "../entities/item-entity";
import { ShoppingList } from "../entities/shoppingList-entity";
import { datasource } from "../../../config/datasource";

export class ItemController {
  private itemRepository: Repository<Item>;
  private shoppingListRepository: Repository<ShoppingList>;

  constructor() {
    this.itemRepository = datasource.getRepository(Item);
    this.shoppingListRepository = datasource.getRepository(ShoppingList);
  }

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const items = await this.itemRepository.find();
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ message: "Error fetching items" });
    }
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const itemId = parseInt(req.params.id);
      const item = await this.itemRepository.findOne({
        where: { item_id: itemId },
      });

      if (!item) {
        res.status(404).send("Item not found");
      } else {
        res.status(200).json(item);
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching the item" });
    }
  };

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const newItem = this.itemRepository.create(req.body);
      await this.itemRepository.save(newItem);
      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json({ message: "Error creating the item" });
    }
  };

  replace = async (req: Request, res: Response): Promise<void> => {
    try {
      const itemId = parseInt(req.params.id);
      const existingItem = await this.itemRepository.findOne({
        where: { item_id: itemId },
      });

      if (!existingItem) {
        res.status(404).send("Item not found");
      } else {
        const updatedItem = this.itemRepository.create({
          ...existingItem,
          ...req.body,
        });
        await this.itemRepository.save(updatedItem);
        res.status(200).json(updatedItem);
      }
    } catch (error) {
      res.status(500).json({ message: "Error updating the item" });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const itemId = parseInt(req.params.id);
      const result = await this.itemRepository.update(itemId, req.body);

      if (result.affected === 0) {
        res.status(404).send("Item not found");
      } else {
        const updatedItem = await this.itemRepository.findOne({
          where: { item_id: itemId },
        });
        res.status(200).json(updatedItem);
      }
    } catch (error) {
      res.status(500).json({ message: "Error partially updating the item" });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    const itemId = parseInt(req.params.id);
    try {
      // verificar se o item está associado a uma lista
      const listsWithItem = await this.shoppingListRepository
        .createQueryBuilder("shopping_list")
        .innerJoin("has", "h", "h.item_id = :itemId", { itemId })
        .where("h.list_id = shopping_list.list_id")
        .getMany();

      // remove a associação antes de remover o item (fk_constraints)
      if (listsWithItem.length > 0) {
        await this.shoppingListRepository
          .createQueryBuilder()
          .relation(ShoppingList, "items")
          .of(listsWithItem)
          .remove(itemId);
      }

      // excluir o item definitivamente
      const result = await this.itemRepository.delete(itemId);
      if (result.affected === 0) {
        res.status(404).send("Item not found");
      } else {
        res.status(204).send();
      }
    } catch (error) {
      res.status(500).json({ message: "Error deleting the item", error });
    }
  };
}
