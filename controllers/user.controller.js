// Require the user Schema into the services
var db = require('../models/user');

// Require the config file that have mongodb url
const conn = require('../bin/config.json');

// That are used to get the value of string data
const jwt = require('jsonwebtoken')

// Require to decrypt and Encrypt the file
var bcrypt = require('bcryptjs');

const { check, validationResult } = require('express-validator');
// That method are used to generate a token of the user register data and validate the user
exports.login = (req, res) => {
    var content = req.body
        // jwt.verify({ db_password: content.password })
    db.findOne({ email: content.email }, (err, data) => {
        if (!data) {
            res.json({
                sucess: false,
                message: "Incorrect login"
            })
        } else {
            if (!bcrypt.compareSync(content.password, data.password)) {
                res.json({
                    sucess: false,
                    message: "Invalid Credentials"
                })
            } else {
                var token = jwt.sign({
                    id: data._id,
                    firstName: data.f_name,
                    lastName: data.l_name,
                    email: data.email,
                }, conn[1].key, { expiresIn: 600 * 600 });

                res.json({
                    sucess: true,
                    message: "Token Generated successfully",
                    token: token

                })
            }


        }
    })
}


exports.register = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    } else {
        var content = req.body;
        var datas = {
            f_name: content.f_name,
            l_name: content.l_name,
            email: content.email
        };
        // Validate if the user are registered than the message are show user registered otherwise create the users

        db.findOne({ email: content.email }, function(err, docs) {
            if (docs !== null) {
                res.json({
                    sucess: false,
                    message: "User Allready Exist",
                    data: err
                })
            } else {
                var obj = new db({
                    f_name: content.f_name,
                    l_name: content.l_name,
                    email: content.email,
                    password: bcrypt.hashSync(content.password, 10)
                })
                obj.save((err, data) => {
                    if (!err) {
                        res.json({
                            success: true,
                            message: "User Add Successfully",
                            data: datas
                        })
                    } else {
                        res.json({
                            success: false,
                            message: "User not Added",
                            data: err.message
                        })
                    }
                })
            }
        })

    }
    exports.delete_user = (req, res) => {
        var currentuser = req.headers.authorization;

        jwt.verify(currentuser, conn[1].key, (err, data) => {
            if (err) {
                res.send(err)
            } else {
                db.deleteOne({ email: data.email }, function(err, doc) {

                    if (doc.deletedCount === 0) {

                        res.json({
                            success: false,
                            message: "User Not Found",
                            data: doc,
                        })

                    } else {
                        res.json({
                            success: true,
                            message: "User Deleted successfull",
                            data: [""]
                        })
                    }
                })
            }

        })

    }
}



// Update the user to the user Id and upgrade the details 

exports.update_user = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    } else {
        var currentuser = req.headers.authorization;

        jwt.verify(currentuser, conn[1].key, (err, data) => {
            if (err) {
                res.send(err)
            } else {
                var content = req.body
                db.findOneAndUpdate({ _id: data.id }, content, { new: true }, function(err, doc) {

                    // var obj = new db({
                    //     f_name: doc.firstName,
                    //     l_name: doc.lastName,
                    //     email: doc.email,
                    //     password: bcrypt.hashSync(doc.password, 10)
                    // })

                    // obj.save((err, data) => {

                    // })
                    var databa = {
                        f_name: data.firstName,
                        l_name: data.lastName,
                        email: data.email
                    }
                    if (doc === null) {

                        return res.json({
                            success: false,
                            message: "User not Exist"
                        })

                    } else {
                        return res.json({
                            success: true,
                            message: "User Updated Successfully",
                            data: databa
                        })

                    }
                });
            }


        })
    }



}




// Get the user through the id

exports.get_user = (req, res) => {
    var currentuser = req.headers.authorization;
    jwt.verify(currentuser, conn[1].key, (err, data) => {
        if (err) {
            res.send(err)
        } else {
            var datab = {
                f_name: data.firstName,
                l_name: data.lastName,
                email: data.email
            }
            db.findOne({ email: data.email }, function(err, data) {
                if (err) {
                    res.send(err)
                } else {
                    if (data === null) {

                        return res.json({
                            success: false,
                            message: "User Not Exist",
                            data: [""]
                        })

                    } else {
                        return res.json({
                            success: true,
                            message: "Users Get Successfully ",
                            data: datab
                        })

                    }
                }


            });
        }


    })



}
exports.get_users = (req, res) => {
    db.find({}, (err, data) => {
        if (err) {
            res.json(err)
        } else {
            res.json(data)
        }

    })


}
module.exports.usersdelete = (req, res, id) => {


    db.find({ _id: id }, (error, result) => {
        try {
            if (result.length > 0) {
                db.deleteOne({ _id: id }, (error, result) => {
                    if (error) {
                        res.status(500).json({ success: false, message: "problem in delete" });
                    } else {
                        res.status(200).json({ success: true, message: "deleted", data: result });
                    }

                });
            } else {
                res.status(500).json({ success: false, message: "data not found" });
            }

        } catch (error) {
            error.message = "please provide valid id"
            res.status(400).json({ success: false, error: error.message });
        }

    });
}
module.exports.usersupdate = (req, res) => {
    var id = req.params.id;
    var content = req.body
    var obj = ({
        f_name: content.f_name,
        l_name: content.l_name,
        email: content.email
    })
    db.findOneAndUpdate({ _id: id }, obj, (error, result) => {
        if (error) {
            res.json({ success: false, message: "Email is Allready Exist" });
        } else {
            res.json({ success: true, message: 'User Updated', data: result });
        }
    });
}

module.exports.userslogin = (req, res) => {
    var content = req.body
        // jwt.verify({ db_password: content.password })
    db.findOne({ email: content.email }, (err, data) => {
        if (!data) {
            res.json({
                success: false,
                message: "Incorrect Email",
                data: err
            })
        } else {
            if (bcrypt.compareSync(content.password, data.password) == false) {
                res.json({
                    success: false,
                    message: "Invalid Password",
                    data: err
                })
            } else {
                res.json({ success: true, message: "User Login Correctly", data: data });
            }
        }

    });


}

module.exports.getById = (req, res, id) => {
    db.find({ _id: id }, (error, result) => {

        if (result) {
            res.status(200).json({ success: true, message: "Get The detail", data: result });
        } else {
            res.status(500).json({ success: false, message: "data not found" });
        }
    });


}