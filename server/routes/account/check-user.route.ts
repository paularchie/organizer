import { Request, Response } from 'express';
import { getUser } from '../../database/account/get-user.db';

export async function handleCheckUserRoute(req: Request, res: Response) {

    const prop = req.body.prop;
    const value = req.body.value;

    try {
        const user = await getUser({ prop, value });

        return res.status(200).send({ userExists: !!user });

    } catch (err) {
        return res.status(500).send(err.message);
    }
}
