// user-entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ShoppingList } from "./shoppingList-entity";

@Entity('user')
export class User {
  @PrimaryGeneratedColumn({ name: "user_id" })
  user_id!: number;

  @Column({ length: 255 })
  name!: string;

  @Column({ length: 255 })
  password!: string;

  @Column({ length: 255 })
  email!: string;

  @OneToMany(() => ShoppingList, (shoppingList) => shoppingList.createdBy)
  shoppingLists!: ShoppingList[];
}