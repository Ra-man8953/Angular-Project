var services = require('../controllers/product.controller')
const express = require('express')
const router = express.Router();
const { check, validationResult } = require('express-validator');

router.post('/', [
    // product name must be an valid
    check('p_name').isLength({ min: 2 }),
    // product desc must be at least 5 chars long
    check('p_desc').isLength({ min: 10 }),
    check('p_image').isLength({ min: 5 })
], (req, res) => {
    services.create_product(req, res);
})


router.put('/update/:id', [check('p_name', 'Please insert the product name minimum legth 3').optional().isLength({ min: 2 }),
    check('p_desc', 'Please update the description above length 10').optional().isLength({ min: 10 }),
    check('p_image', 'Product Image length must be 6 ').optional().isLength({ min: 5 })
], (req, res) => {
    services.update_product(req, res);
})

router.delete('/:id', (req, res) => {
    services.delete_product(req, res);
})


router.get('/:id', (req, res) => {
    services.show_user_products(req, res);
})

router.get('', (req, res) => {
    services.show_all_products(req, res)
})

router.post('/:id', (req, res) => {
    services.productsstore(req, res)
})

router.delete('/delete/:id', (req, res) => {
    var id = req.params.id;
    services.productsdelete(req, res, id)
})

router.put('/:id', (req, res) => {
    var id = req.params.id;
    services.productsupdate(req, res, id)
})

router.get('/product/:id', (req, res) => {
    var id = req.params.id;
    services.getById(req, res, id)
})

module.exports = router