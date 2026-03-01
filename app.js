require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const routes = require('./src/routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api', routes);

app.get('/', (req, res) => {
    res.json({
        message: 'API is running',
        version: '1.0.0',
        endpoints: [
            'POST /api/login',
            'POST /api/register',
            'GET  /api/users',
            'GET  /api/users/:id',
            'PUT  /api/users/:id',
            'GET  /api/products?q=&search=',
            'POST /api/products',
            'POST /api/ping',
            'POST /api/calculate',
            'GET  /api/file?file=',
            'GET  /api/admin/dashboard',
            'DELETE /api/admin/users/:id',
        ],
    });
});

// Global error handler
app.use((err, req, res, _next) => {
    console.error(err);
    res.status(500).json({
        error: err.message,
        stack: err.stack,
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
