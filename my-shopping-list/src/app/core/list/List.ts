import Item from "../item/Item";

export default interface List {
  list_id: number;
  name: string;
  description: string;
  createdBy: number;
  icon: string;
  numItems: number;
  due: Date;
  items: Item[];
}
