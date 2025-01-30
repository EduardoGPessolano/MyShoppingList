import 'dotenv/config';
import 'reflect-metadata';
import app from './app';
import { datasource } from './config/datasource';
import logger from './utils/logger';

const port: number = parseInt(process.env.PORT || '3000', 10);

datasource.initialize()
    .then(() => {
        app.listen(port, () => {
            logger.info(`Server is running on http://localhost:${port}/my_shopping_list`);
        });
    })
    .catch((error: Error) => {
        logger.error('Error during Data Source initialization', error);
        process.exit(1); // Encerra o processo caso a inicialização do banco falhe.
    });