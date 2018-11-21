import { Request, Response, NextFunction } from 'express';
import { decodeJwt } from '../services/security.util';


export function retrieveUserIdFromRequest(req: Request, res: Response, next: NextFunction) {

    const jwt = req.cookies['SESSIONID'];

    if (jwt) {
        handleSessionCookie(jwt, req)
            .then(() => next())
            .catch(err => {
                console.error(err);
                next();
            });
    } else {
        next();
    }
}

async function handleSessionCookie(jwt: string, req: Request) {
    try {

        const payload = await decodeJwt(jwt);

        req['user'] = JSON.parse(payload.sub);

    } catch (err) {
        console.log('Error: Could not extract user from request:', err.message);
    }
}






