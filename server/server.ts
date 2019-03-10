import * as express from 'express';
import * as https from 'https';
import * as fs from 'fs';
import * as mongoose from 'mongoose';
import { keys, config } from './config/index';
import { retrieveUserIdFromRequest } from './middlewares/retrieve-user.middleware';
import { allowCORS } from './middlewares/cors.middleware';
import { indexRoutes } from './routes';
import { prerender } from './services/prerender';
import { applyCaching } from './services/cache';
import * as  nodemailer from 'nodemailer';



const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

// mongoose.connect('mongodb://127.0.0.1:27017', { useNewUrlParser: true });

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(allowCORS);
app.use(retrieveUserIdFromRequest);
app.use(applyCaching);

const distFolder = __dirname + '/dist/client';

app.use(express.static(distFolder));

indexRoutes(app);

if (config.prerender) {
    prerender(app, distFolder);
} else {
    app.get('*', (req, res) => {
        res.sendFile(distFolder + '/index.html');
    });
}

if (config.secure) {
    const httpsServer = https.createServer({
        key: fs.readFileSync('key.pem'),
        cert: fs.readFileSync('cert.pem')
    }, app);

    httpsServer.listen(3000, () => console.log('HTTPS Secure Server running at https://localhost:' + httpsServer.address()['port']));

} else {
    const httpServer = app.listen(3000, () => {
        console.log('HTTP Server running at http://localhost:' + httpServer.address()['port']);
    });
}












