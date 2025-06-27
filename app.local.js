// This file is for LOCAL DEVELOPMENT ONLY.
// It is NOT used in Vercel deployment. Vercel uses api/index.js as the entry point for serverless deployment.
// You can use this file to run your app locally with `node app.local.js`.

const express = require('express');
const subdomain = require('express-subdomain');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const axios = require('axios');

const app = express();
app.use(express.urlencoded({ extended: true }));

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout');

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to set base URL for templates
app.use((req, res, next) => {
    const protocol = req.protocol;
    const host = req.get('host');

    // Remove any existing blog. prefix to prevent multiple prefixes
    const cleanHost = host.replace(/^blog\./, '');

    // Set the base URL (main domain)
    res.locals.baseUrl = `${protocol}://${cleanHost}`;

    // Set the blog URL (only if we're not already on the blog subdomain)
    if (!host.startsWith('blog.')) {
        res.locals.blogUrl = `${protocol}://blog.${cleanHost}`;
    } else {
        res.locals.blogUrl = `${protocol}://${host}`;
    }

    next();
});

// Middleware to handle subdomains
app.use((req, res, next) => {
    const hostname = req.hostname;
    if (hostname.startsWith('blog.')) {
        // Blog subdomain routes
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

// Main domain routes
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
    res.render('poll', {
        title: 'Poll',
        active: 'poll'
    });
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

// Error handling
app.use((req, res) => {
    res.status(404).send('Page not found');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Main site: http://localhost:${PORT}`);
    console.log(`Blog subdomain: http://blog.localhost:${PORT}`);
}); 