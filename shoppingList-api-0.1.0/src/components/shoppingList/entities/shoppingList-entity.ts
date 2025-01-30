// shoppingList-entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Item } from "./item-entity";
import { User } from "./user-entity";

@Entity("shopping_list")
export class ShoppingList {
  @PrimaryGeneratedColumn({ name: "list_id" })
  list_id!: number;

  @Column({ length: 255 })
  description!: string;

  @Column({ length: 255 })
  name!: string;

  @Column({ length: 255 })
  icon!: string; // campo para o ícone da lista

  @Column("date")
  due!: Date; // data 'limite' para realizar a compra dos itens da lista

  @ManyToMany(() => Item, (item) => item.shoppingLists)
  @JoinTable({
    name: "has",
    joinColumn: { name: "list_id", referencedColumnName: "list_id" },
    inverseJoinColumn: { name: "item_id", referencedColumnName: "item_id" },
  })
  items!: Item[];

  @ManyToOne(() => User, (user) => user.shoppingLists)
  @JoinColumn({ name: "createdby" }) // indica o usuário criador da lista
  createdBy!: User;
}
