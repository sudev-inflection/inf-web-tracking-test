const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const serverless = require('serverless-http');
const axios = require('axios');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(expressLayouts);
app.set('layout', 'layout');

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));

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

app.get('/content', (req, res) => {
    res.render('content', {
        title: 'Content',
        active: 'content'
    });
});

app.get('/webinars', (req, res) => {
    res.render('webinars', {
        title: 'Webinars',
        active: 'webinars'
    });
});

app.get('/webinars/unlocking-website-analytics', (req, res) => {
    res.render('webinar-landing', {
        title: 'Unlocking the Power of Website Analytics',
        active: 'webinars'
    });
});

app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;
    try {
        await axios.post('https://ingestion.webhook.inflection.io/685e42eb3fe609129ba30c00', {
            name,
            email,
            message
        });
        res.render('contact', {
            title: 'Contact',
            active: 'contact',
            success: true
        });
    } catch (error) {
        res.render('contact', {
            title: 'Contact',
            active: 'contact',
            error: 'There was a problem submitting your message. Please try again.'
        });
    }
});

app.post('/webinars/unlocking-website-analytics', async (req, res) => {
    const { name, email } = req.body;
    try {
        await axios.post('https://ingestion.webhook.inflection.io/685e4d07f16cffec6fb304c5', {
            name,
            email,
            webinar: 'Unlocking the Power of Website Analytics'
        });
        res.render('webinar-landing', {
            title: 'Unlocking the Power of Website Analytics',
            active: 'webinars',
            success: true
        });
    } catch (error) {
        res.render('webinar-landing', {
            title: 'Unlocking the Power of Website Analytics',
            active: 'webinars',
            error: 'There was a problem submitting your registration. Please try again.'
        });
    }
});

app.use((req, res) => {
    res.status(404).send('Page not found');
});

module.exports = app;
module.exports.handler = serverless(app); 