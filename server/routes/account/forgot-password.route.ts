import { Request, Response } from 'express';
import { getUser, getUserByEmail } from '../../database/account/get-user.db';
import { User } from '../../models/user.model';
import { UserSchema } from '../../schemas/user.schema';

const util = require('util');
const crypto = require('crypto');

export const randomBytes = util.promisify(crypto.randomBytes);

export async function handleForgotPasswordRoute(req: Request, res: Response) {

    const email = req.body.email;

    try {
        const user = await getUserByEmail(email);
        const token = await createResetPasswordToken();


        await new UserSchema({ ...user, ...{ token }, }).save();

        return user
            ? res.status(200).send()
            : res.sendStatus(403);

    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function createResetPasswordToken() {
    return await randomBytes(32).then(bytes => bytes.toString('hex'));
}
