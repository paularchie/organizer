import { Application } from 'express';
import { partial } from 'lodash';
import { CacheKeys, UserRoles } from '../../constants';

// route handlers
import { handleGetUserRoute } from './get-user.route';
import { handleCheckUserRoute } from './../account/check-user.route';
import { handleLoginRoute } from './login.route';
import { handleLogoutRoute } from './logout.route';
import { handleLoginAsUserRoute } from './login-as-user.route';
import { handleCreateUserRoute } from './../account/create-user.route';
import { handleForgotPasswordRoute } from './../account/forgot-password.route';
import { handleResetPasswordRoute } from './../account/reset-password.route';

// middlewares
import { checkIfAuthenticated } from '../../middlewares/authentication.middleware';
import { checkCsrfToken } from '../../middlewares/csrf.middleware';
import { cleanCache } from '../../middlewares/clean-cache';
import { checkIfAuthorized } from '../../middlewares/authorization.middleware';


export function indexAccountRoutes(app: Application) {

    app.route('/api/signup').post(partial(cleanCache, CacheKeys.USER, false), handleCreateUserRoute);

    app.route('/api/user').get(handleGetUserRoute);

    app.route('/api/admin').post(checkIfAuthenticated, partial(checkIfAuthorized, [UserRoles.ADMIN]), handleLoginAsUserRoute);

    app.route('/api/login').post(handleLoginRoute);

    app.route('/api/logout').post(checkIfAuthenticated, checkCsrfToken, handleLogoutRoute);

    app.route('/api/checkUser').post(handleCheckUserRoute);

    app.route('/api/forgotPassword').post(handleForgotPasswordRoute);

    app.route('/api/resetPassword').post(handleResetPasswordRoute);

}

