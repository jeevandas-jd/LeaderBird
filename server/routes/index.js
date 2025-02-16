const express = require('express');
const router = express.Router();


// Sample Route
router.get('/', (req, res) => {
    //res.send('Welcome to your Express.js app! 🚀');

    res.json({message:"Welcome to your Express.js app! 🚀"});
});

module.exports = router;
