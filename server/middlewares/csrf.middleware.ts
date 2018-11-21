import { Request, Response, NextFunction } from 'express';

export function checkCsrfToken(req: Request, res: Response, next: NextFunction) {

    const csrfCookie = req.cookies['XSRF-TOKEN'];

    const csrfHeader = req.headers['x-xsrf-token'];

    // make sure the csrf cookie and header are attached to the request
    if (csrfCookie && csrfHeader && csrfCookie === csrfHeader) {
        next();
    } else {
        res.sendStatus(403);
    }
}

