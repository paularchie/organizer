import { Application } from 'express';
import { indexAccountRoutes } from './auth/index';
import { indexUserRoutes } from './users';

export function indexRoutes(app: Application) {

    indexAccountRoutes(app);
    indexUserRoutes(app);

}

