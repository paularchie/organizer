import { Request, Response } from 'express';
import * as argon2 from 'argon2';
import { createSessionToken, createCsrfToken } from '../../services/security.util';
import { getUserByEmail } from '../../database/account/get-user.db';
import { User } from '../../models/user.model';
import { config } from '../../config';


export async function handleLoginRoute(req: Request, res: Response) {
    const credentials = req.body;

    const user = await getUserByEmail(credentials.email) as User;

    if (user) {
        try {
            await attemptLogin(credentials, user);

            await createSession(res, user);

            res.status(200).send({ id: user.id, roles: user.roles });

        } catch (ex) {
            res.status(403).send();
        }
    } else {
        res.status(403).send();
    }
}

async function attemptLogin(credentials, user): Promise<void> {
    const passwordValid = await argon2.verify(user.password, credentials.password);

    if (!passwordValid) {
        throw new Error('Password invalid');
    }
}

async function createSession(res: Response, user: any): Promise<void> {

    res.cookie('SESSIONID', await createSessionToken(user), { httpOnly: config.secure, secure: config.secure });

    res.cookie('XSRF-TOKEN', await createCsrfToken());
}
