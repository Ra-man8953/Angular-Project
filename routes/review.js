var services = require('../controllers/reviews.controller')
const express = require('express')
const router = express.Router();
const { check, validationResult } = require('express-validator');

// Create the Reviews bu product Id


router.post('/:p_id', [check('review_message', 'Please insert the Review').isLength({ min: 5 })], (req, res) => {
    services.create_review(req, res);
})

// Show the product reviews

router.get('/:p_id', (req, res) => {
    services.show_product_reviews(req, res);
})

// Delete the reviews by the product Id

router.delete('/:id', (req, res) => {
    services.delete_review(req, res);
})

// Update the reviews by the product Id

router.put('/update/:id', [check('review_message', 'Please insert the Review').isLength({ min: 5 })], (req, res) => {
    services.update_review(req, res);
})
router.get('', (req, res) => {
    services.show_all_review(req, res);
})
module.exports = router