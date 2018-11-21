import * as express from 'express';
import { renderModuleFactory } from '@angular/platform-server';
import { enableProdMode } from '@angular/core';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

export function prerender(app, distFolder) {

    const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('../../dist-prerender/main');

    enableProdMode();

    app.set('view engine', 'html');

    app.set('views', distFolder);

    app.engine('html', ngExpressEngine({
        bootstrap: AppServerModuleNgFactory,
        providers: [provideModuleMap(LAZY_MODULE_MAP)]
    }));

    app.get('*', (req, res) => {
        res.render('index', { req });
    });
}

