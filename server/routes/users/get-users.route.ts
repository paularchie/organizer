import { Request, Response } from 'express';
import { getUsers } from '../../database/users/get-users.db';

export async function handleGetUsersRoute(req: Request, res: Response) {

    try {
        res.status(200).json({ users: await getUsers() });
    } catch (ex) {
        res.status(500).json({ message: ex.message });
    }
}

