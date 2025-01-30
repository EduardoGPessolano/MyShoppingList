// item-entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { ShoppingList } from "./shoppingList-entity";

@Entity("item")
export class Item {
  @PrimaryGeneratedColumn({ name: "item_id" })
  item_id!: number;

  @Column("int")
  units!: number; // quantidade do item a ser comprado

  @Column("boolean", { default: false })
  bought!: boolean; // indica se o item já foi comprado ou não

  @Column({ length: 255 })
  name!: string;

  @Column("decimal", { precision: 10, scale: 2 })
  price!: number;

  @Column({ length: 255 })
  icon!: string; // campo para o ícone do item

  @Column({ type: "simple-array" })
  category!: string[]; // campo para categorias (lista de strings)

  @ManyToMany(() => ShoppingList, (shoppingList) => shoppingList.items)
  shoppingLists!: ShoppingList[];
}
