// This file is for LOCAL DEVELOPMENT ONLY.
// It is NOT used in Vercel deployment. Vercel uses api/index.js as the entry point for serverless deployment.
// You can use this file to run your app locally with `node app.local.js`.

const express = require('express');
const subdomain = require('express-subdomain');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const app = express();

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