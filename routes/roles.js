const express = require('express');
const router = express.Router();

// const Role = require('../schemas/roles'); 

// API mặc định để test thử
router.get('/', (req, res) => {
    res.send('API của Roles đã hoạt động!');
});

module.exports = router;