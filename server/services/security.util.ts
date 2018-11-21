import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import * as argon2 from 'argon2';
import { User } from '../models/user.model';

const util = require('util');
const crypto = require('crypto');

export const randomBytes = util.promisify(crypto.randomBytes);
export const signJwt = util.promisify(jwt.sign);

const RSA_PRIVATE_KEY = fs.readFileSync('./server/private.key');
const RSA_PUBLIC_KEY = fs.readFileSync('./server/public.key');
const SESSION_DURATION = 100000;


export function createSessionToken(user: User) {

    return signJwt({
        roles: user.roles
    },
        RSA_PRIVATE_KEY, {
            algorithm: 'RS256',
            expiresIn: SESSION_DURATION,
            subject: JSON.stringify({ id: user.id, roles: user.roles })
        });
}

export async function decodeJwt(token: string) {
    return await jwt.verify(token, RSA_PUBLIC_KEY);
}

export async function createCsrfToken() {
    return await randomBytes(32).then(bytes => bytes.toString('hex'));
}
