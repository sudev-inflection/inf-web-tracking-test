// This file is for LOCAL DEVELOPMENT ONLY.
// It imports the Vercel serverless app and runs it locally.

const app = require('./api/index.js');

const PORT = process.env.PORT || 3000;

// For local development, we need to start the server
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log(`Main site: http://localhost:${PORT}`);
        console.log(`Blog subdomain: http://blog.localhost:${PORT}`);
    });
}

module.exports = app; 