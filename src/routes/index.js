const express = require('express');
const router = express.Router();
const controller = require('../controller');

// Auth
router.post('/login', controller.login);
router.post('/register', controller.register);

// Users
router.get('/users', controller.verifyToken, controller.getAllUsers);
router.get('/users/:id', controller.verifyToken, controller.getUser);
router.put('/users/:id', controller.verifyToken, controller.updateUser);

// Products
router.get('/products', controller.searchProducts);
router.post('/products', controller.verifyToken, controller.createProduct);

// Utilities
router.post('/ping', controller.ping);
router.post('/calculate', controller.calculate);
router.get('/file', controller.getFile);

// Admin
router.get('/admin/dashboard', controller.adminDashboard);
router.delete('/admin/users/:id', controller.deleteUser);

module.exports = router;
