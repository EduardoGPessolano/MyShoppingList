import { Request, Response } from 'express';

export class HealthCheckController {
    healthCheck = (req: Request, res: Response): void => {
        res.status(200).json({ status: 'Sucesso' });
    };
}