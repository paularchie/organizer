import { Application } from 'express';
import { partial } from 'lodash';
import { CacheKeys, UserRoles } from '../../constants';

// route handlers
import { handleGetUsersRoute } from './../user/get-users.route';

// middlewares
import { checkIfAuthenticated } from '../../middlewares/authentication.middleware';
import { checkCsrfToken } from '../../middlewares/csrf.middleware';
import { cleanCache } from '../../middlewares/clean-cache';
import { checkIfAuthorized } from '../../middlewares/authorization.middleware';


export function indexUserRoutes(app: Application) {

    app.route('/api/users').get(checkIfAuthenticated, partial(checkIfAuthorized, [UserRoles.ADMIN]), handleGetUsersRoute);

}

