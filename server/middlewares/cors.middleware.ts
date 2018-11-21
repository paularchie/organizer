export function allowCORS(req, res, next) {
    const allowedOrigins = ['http://localhost:4200', 'https://localhost:4200'];
    const origin = req.headers.origin;

    if (allowedOrigins.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    res.header('Access-Control-Allow-Credentials', 'true');
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.append('Access-Control-Allow-Headers', ['Content-Type', 'x-xsrf-token']);

    next();
}
