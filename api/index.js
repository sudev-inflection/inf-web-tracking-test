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
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers['x-forwarded-host'] || req.headers.host;
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
    const hostname = req.headers['x-forwarded-host'] || req.headers.host;
    if (hostname.startsWith('blog.')) {
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

app.use((req, res) => {
    res.status(404).send('Page not found');
});

module.exports = app;
module.exports.handler = serverless(app); 