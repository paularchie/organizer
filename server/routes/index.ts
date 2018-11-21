import { Application } from 'express';
import { indexAccountRoutes } from './account/index';
import { indexUserRoutes } from './user';

export function indexRoutes(app: Application) {

    indexAccountRoutes(app);

    indexUserRoutes(app);

}

