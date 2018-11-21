import { Request, Response } from 'express';
import { createSessionToken, createCsrfToken } from '../../services/security.util';
import * as argon2 from 'argon2';
import { User } from '../../models/user.model';
import { createUser } from '../../database/account/create-user.db';
import { validatePassword } from '../../util/validate-password';


export async function handleCreateUserRoute(req: Request, res: Response) {

    const newUser = req.body;

    // check if password meets security criteria
    // it's checked on the front end, but that's for user experience only
    const errors = validatePassword(newUser.password);

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    try {
        const user = await hashPasswordAndCreateUser(newUser) as User;

        await createSession(res, user);

        res.status(200).send({ id: user.id, roles: user.roles });

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}


async function hashPasswordAndCreateUser(user) {

    user.password = await argon2.hash(user.password);

    return await createUser(user);
}


async function createSession(res: Response, user: User) {

    const sessionToken = await createSessionToken(user);

    const csrfToken = await createCsrfToken();

    res.cookie('SESSIONID', sessionToken, { httpOnly: true, secure: true });

    res.cookie('XSRF-TOKEN', csrfToken);
}



