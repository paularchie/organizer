import { Request, Response } from 'express';
import { getUser, getUserByEmail } from '../../database/auth/get-user.db';

export async function handleResetPasswordRoute(req: Request, res: Response) {

    const email = req.body.email;

    try {
        const user = await getUserByEmail(email);

        return user
            ? res.status(200).send()
            : res.sendStatus(403);

    } catch (err) {
        return res.status(500).send(err.message);
    }
}
