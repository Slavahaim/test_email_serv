import { Router, Request, Response } from 'express';

const router = Router();

// POST - email 
router.post('/email/create', async (req: Request, res: Response) => {
    // TO DO
    const result : string = '/email/create';
    res.status(201).json({ user: result });
});

// POST - email 
router.get('/email/all', async (req: Request, res: Response) => {
    // TO DO
    const result : string = '/email/all';
    res.status(201).json({ user: result });
});

// POST - email 
router.put('/email/update', async (req: Request, res: Response) => {
    // TO DO
    const result : string = '/email/update';
    res.status(201).json({ user: result });
});

// POST - email 
router.delete('/email/delete', async (req: Request, res: Response) => {
    // TO DO
    const result : string = '/email/delete';
    res.status(201).json({ user: result });
});

export default router;