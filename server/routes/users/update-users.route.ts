import { Request, Response } from 'express';
import { getUsers } from '../../database/users/get-users.db';
import { updateUsers } from '../../database/users/update-users.db';

export async function handleUpdateUserRoute(req: Request, res: Response) {

    const users = [req.body];

    try {
        res.status(200).json({ users: await updateUsers(users) });
    } catch (ex) {
        res.status(500).json({ message: ex.message });
    }
}

