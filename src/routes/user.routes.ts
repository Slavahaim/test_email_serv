import { Router, Request, Response } from 'express';

const router = Router();

// POST - users registration
router.post('/user/register', async (req: Request, res: Response) => {
    // TO DO
    const result : string = '/user/register';
    res.status(200).json({ users: result });
});

// POST - users authorization
router.post('/user/login', async (req: Request, res: Response) => {
    // TO DO
    const result : string = '/user/login';
    res.status(200).json({ user: result });
});

export default router;