const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const serverless = require('serverless-http');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(expressLayouts);
app.set('layout', 'layout');

app.use(express.static(path.join(__dirname, '../public')));

app.use((req, res, next) => {
    const protocol = req.headers['x-forwarded-proto'] || req.protocol || 'http';
    const host = req.headers['x-forwarded-host'] || req.headers.host || req.get('host');
    const cleanHost = host.replace(/^blog\./, '');
    res.locals.baseUrl = `${protocol}://${cleanHost}`;
    if (!host.startsWith('blog.')) {
        res.locals.blogUrl = `${protocol}://blog.${cleanHost}`;
    } else {
        res.locals.blogUrl = `${protocol}://${host}`;
    }
    next();
});

app.use((req, res, next) => {
    const hostname = req.headers['x-forwarded-host'] || req.headers.host || req.get('host');
    if (hostname && hostname.startsWith('blog.')) {
        if (req.path === '/') {
            return res.render('blog/index', {
                title: 'Blog',
                active: 'blog'
            });
        } else if (req.path === '/getting-started') {
            return res.render('blog/post1', {
                title: 'Getting Started with Website Analytics',
                active: 'blog'
            });
        }
    }
    next();
});

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home',
        active: 'home'
    });
});

app.get('/features', (req, res) => {
    res.render('features', {
        title: 'Features',
        active: 'features'
    });
});

app.get('/pricing', (req, res) => {
    res.render('pricing', {
        title: 'Pricing',
        active: 'pricing'
    });
});

app.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'Contact',
        active: 'contact'
    });
});

app.get('/poll', (req, res) => {
    try {
        res.render('poll', {
            title: 'Poll',
            active: 'poll'
        });
    } catch (error) {
        console.error('Error rendering poll page:', error);
        // Fallback to simple HTML response
        res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Poll - TrackFlow</title>
                <link rel="stylesheet" href="/css/styles.css">
            </head>
            <body>
                <h1>Poll Page Test</h1>
                <p>This is a test response to see if the route is working.</p>
                <a href="/">Back to Home</a>
            </body>
            </html>
        `);
    }
});

app.use((req, res) => {
    res.status(404).send('Page not found');
});

module.exports = app;
module.exports.handler = serverless(app); 