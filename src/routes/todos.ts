import { Router } from 'express';
import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import client from '../database';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        const { title, description, completed, timeAdded, expectedTimeFinished, timeToComplete } = req.body;
        
        // Create the todo object with all parameters
        const todo = {
            title,
            description: description || title,
            completed: completed || false, // default to false if not provided
            timeAdded : new Date(timeAdded) || new Date(),
            expectedTimeFinished : new Date(expectedTimeFinished) || null,
            timeToComplete: timeToComplete || null
        };

        // Insert the todo into the database
        const result = await client
            .db('todo-list')
            .collection('todos')
            .insertOne(todo);

        res.json(result);
    } catch (error) {
        console.error('Error adding todo:', error);
        res.status(500).json({ error: 'Failed to add todo' });
    }
});

router.get('/', async (req: Request, res: Response) => {
    const todos = await client
        .db('todo-list')
        .collection('todos')
        .find()
        .toArray();

    res.json(todos);
});

router.get('/completed/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await client
        .db('todo-list')
        .collection('todos')
        .updateOne(
            { _id: new ObjectId(id) },
            { $set: { completed: true } }
        );

    res.json(result);
});

router.get('/un-completed/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await client
        .db('todo-list')
        .collection('todos')
        .updateOne(
            { _id: new ObjectId(id) },
            { $set: { completed: false } }
        );

    res.json(result);
});

router.get('/delete/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await client
        .db('todo-list')
        .collection('todos')
        .deleteOne({ _id: new ObjectId(id) });

    res.json(result);
});

router.get('/get-un-completed', async (req: Request, res: Response) => {
    const todos = await client
        .db('todo-list')
        .collection('todos')
        .find({ completed: false })
        .toArray();

    res.json(todos);
});

router.get('/get-completed', async (req: Request, res: Response) => {
    const todos = await client
        .db('todo-list')
        .collection('todos')
        .find({ completed: true })
        .toArray();

    res.json(todos);
});

export default router;