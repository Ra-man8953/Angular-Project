const use = require('../controllers/user.controller')
const express = require('express')
const router = express.Router();
const { check, validationResult } = require('express-validator');
const schema = require('../models/user')

router.post('/register', [
    // email must be an email
    check('email').isEmail(),
    // password must be at least 5 chars long
    check('password').isLength({ min: 5 })
], function(req, res) {
    use.register(req, res)

})

router.post('/login', function(req, res) {
    use.login(req, res)

})
router.delete('/delete', function(req, res) {
    use.delete_user(req, res)

})

// update the user dewtails through user id

router.put('/update', [
    check('f_name').optional().isLength({ min: 2 }),
    check('email').optional().isEmail(),
    check('password').optional().isLength({ min: 5 }),
    check('l_name').optional().isLength({ min: 2 })
], function(req, res) {
    use.update_user(req, res)
})

router.post('/logi', (req, res) => {
    use.userslogin(req, res)
})

router.put('/update/:id', [
    check('f_name').optional().isLength({ min: 2 }),
    check('email').optional().isEmail(),
    check('password').optional().isLength({ min: 5 }),
    check('l_name').optional().isLength({ min: 2 })
], (req, res) => {
    use.usersupdate(req, res)

})
router.delete('/:id', (req, res) => {
    var id = req.params.id;
    use.usersdelete(req, res, id)
})


// Retrieve the user details through the database

router.get('/user/:id', function(req, res) {
    var id = req.params.id;
    use.getById(req, res, id)
})

router.get('/all', function(req, res) {
    use.get_users(req, res)
})

module.exports = router