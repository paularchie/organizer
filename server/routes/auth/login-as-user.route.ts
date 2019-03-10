import { createSessionToken, createCsrfToken } from '../../services/security.util';
import { User } from '../../models/user.model';
import { getUserByEmail } from '../../database/auth/get-user.db';


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
        res.sendStatus(403);
    }
}

async function createSession(res: Response, user: User): Promise<void> {
    res['cookie']('SESSIONID', await createSessionToken(user), { httpOnly: false, secure: false });
    res['cookie']('XSRF-TOKEN', await createCsrfToken());
}
