import { Router } from 'express';
import { HealthCheckController } from '../controllers/healthCheck-controller';

const router = Router();
const healthCheckController = new HealthCheckController();

router.get('/health_check', healthCheckController.healthCheck);


export default router;