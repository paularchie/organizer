import { Request, Response } from 'express';
import { getUserById } from '../../database/account/get-user.db';
import { User } from '../../models/user.model';


export async function handleGetUserRoute(req: Request, res: Response) {

    if (!req['user']) {
        return res.sendStatus(204);
    }

    const user = await getUserById(req['user'].id) as User;

    if (user) {
        res.status(200).json({ id: user.id, roles: user.roles });
    } else {
        res.sendStatus(204);
    }
}
