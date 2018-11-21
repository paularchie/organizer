import { createSessionToken, createCsrfToken } from '../../services/security.util';
import { User } from '../../models/user.model';
import { getUserByEmail } from '../../database/account/get-user.db';


export async function handleLoginAsUserRoute(req, res) {

    const impersonatedUserEmail = req.body.email;

    const impersonatedUser = await getUserByEmail(impersonatedUserEmail) as User;

    try {

        await createSession(res, impersonatedUser);

        res.status(200).json({
            id: impersonatedUser.id,
            email: impersonatedUser.email,
            roles: impersonatedUser.roles
        });


    } catch (err) {
        console.log('Error trying to login as user', err.message);
        res.sendStatus(500);
    }
}

async function createSession(res: Response, user: User): Promise<void> {

    res['cookie']('SESSIONID', await createSessionToken(user), { httpOnly: true, secure: true });

    res['cookie']('XSRF-TOKEN', await createCsrfToken());
}
