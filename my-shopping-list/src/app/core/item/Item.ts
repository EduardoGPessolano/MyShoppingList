export default interface Item {
  item_id: number;
  name: string;
  units: number;
  bought: boolean;
  price: number;
  icon: string;
  category: string[];
}
