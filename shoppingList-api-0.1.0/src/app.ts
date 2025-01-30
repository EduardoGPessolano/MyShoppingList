import express, { json, Request, Response } from 'express';
import userRoutes from './components/shoppingList/routes/user-routes';
import loginRoutes from './components/shoppingList/routes/login-routes';
import shoppingListRoutes from './components/shoppingList/routes/shoppingList-routes';
import itemRoutes from './components/shoppingList/routes/item-routes';
import errorHandler from './middlewares/error-handler';
import cors from 'cors';  
import { LoginController } from './components/shoppingList/controllers/loginController';

const app = express();
app.use(json());

// CORS para permitir requisições do frontend
app.use(cors({ origin: 'http://localhost:3000' }));  

const base_url = '/my_shopping_list';
const router = express.Router();

app.use(base_url, router);

router.get('/', (req: Request, res: Response) => {
    res.send('Shopping List API');
});

// Health check endpoint
router.get('/healthcheck', (req: Request, res: Response) => {
    res.status(200).json({ status: 'Sucesso' });
});

// User routes
router.use('/users', userRoutes);

// Shopping list routes
router.use('/lists', shoppingListRoutes);

// Item routes
router.use('/items', itemRoutes);

// Login routes
router.use('/login', loginRoutes);


// Error handling middleware
router.use(errorHandler);

export default app;