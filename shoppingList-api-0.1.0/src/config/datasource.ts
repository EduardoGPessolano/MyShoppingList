import { DataSource } from 'typeorm';
import { User } from '../components/shoppingList/entities/user-entity';
import { ShoppingList } from '../components/shoppingList/entities/shoppingList-entity';
import { Item } from '../components/shoppingList/entities/item-entity';

export const datasource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User, ShoppingList, Item],
    synchronize: false,
    logging: 'all',
});