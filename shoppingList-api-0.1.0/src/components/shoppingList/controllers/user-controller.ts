import { Request, Response } from "express";
import { Repository } from "typeorm";
import { User } from "../entities/user-entity";
import { ShoppingList } from "../entities/shoppingList-entity";
import { datasource } from "../../../config/datasource";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export class UserController {
  private userRepository: Repository<User>;
  private shoppingListRepository: Repository<ShoppingList>;

  constructor() {
    this.userRepository = datasource.getRepository(User);
    this.shoppingListRepository = datasource.getRepository(ShoppingList);
  }

  // Função para criar um novo usuário
  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const hashedPassword = await argon2.hash(String(req.body.password));
      const newUser = this.userRepository.create({
        ...req.body,
        password: hashedPassword,
      });
      await this.userRepository.save(newUser);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: "Error creating user", error });
    }
  };

  // Função para obter todos os usuários
  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await this.userRepository.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Error fetching users", error });
    }
  };

  // Função para obter um usuário pelo ID
  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await this.userRepository.findOneBy({
        user_id: parseInt(req.params.id),
      });
      if (!user) {
        res.status(404).send("User not found");
      } else {
        res.status(200).json(user);
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching user", error });
    }
  };

  // Função para login do usuário
  loginUser = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    console.log("--------req.body: ", req.body);
    try {
      const user = await this.getByEmail(email);
      console.log("#######>", user);
      if (user && (await argon2.verify(user.password, password))) {
        const token = jwt.sign(
          { id: user.user_id, email: user.email },
          process.env.TOKEN_KEY!,
          { expiresIn: "6h" }
        );
        return res.status(200).json({ ...user, token });
      } else {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error logging in user", error });
    }
  };

  // Função para obter um usuário pelo email
  getByEmail = async (email: string): Promise<User | null> => {
    try {
      const user = await this.userRepository.findOne({
        where: { email },
      });
      return user || null;
    } catch (error) {
      console.error("Error fetching user by email:", error);
      return null;
    }
  };

  // Função para substituir um usuário pelo ID
  replace = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = parseInt(req.params.id);
      const existingUser = await this.userRepository.findOneBy({
        user_id: userId,
      });

      if (!existingUser) {
        res.status(404).send("User not found");
      } else {
        const updatedUser = this.userRepository.create({
          ...existingUser,
          ...req.body,
        });
        await this.userRepository.save(updatedUser);
        res.status(200).json(updatedUser);
      }
    } catch (error) {
      res.status(500).json({ message: "Error replacing user", error });
    }
  };

  // Função para atualizar um usuário pelo ID
  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = parseInt(req.params.id);
      const result = await this.userRepository.update(userId, req.body);

      if (result.affected === 0) {
        res.status(404).send("User not found");
      } else {
        const updatedUser = await this.userRepository.findOneBy({
          user_id: userId,
        });
        res.status(200).json(updatedUser);
      }
    } catch (error) {
      res.status(500).json({ message: "Error updating user", error });
    }
  };

  // Função para deletar um usuário pelo ID
  delete = async (req: Request, res: Response): Promise<void> => {
    const userId = parseInt(req.params.id);
    try {
      const entityManager = datasource.manager;

      // Deletar associações do usuário com listas de compras
      await entityManager
        .createQueryBuilder()
        .delete()
        .from("has")
        .where(
          '"list_id" IN (SELECT "list_id" FROM shopping_list WHERE "createdby" = :userId)',
          { userId }
        )
        .execute();

      // Deletar todas as listas de compras do usuário
      await entityManager
        .createQueryBuilder()
        .delete()
        .from("shopping_list")
        .where('"createdby" = :userId', { userId })
        .execute();

      // Deletar o usuário definitivamente
      const result = await this.userRepository.delete(userId);
      if (result.affected === 0) {
        res.status(404).json({ message: "User not found" });
      } else {
        res.status(204).send();
      }
    } catch (error) {
      res.status(500).json({ message: "Error deleting user", error });
    }
  };
}
