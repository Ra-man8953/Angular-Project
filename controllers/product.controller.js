// Require the product schema to add product details
var db_product = require('../models/product')
var db_review = require('../models/review')
    // require the config file that pass database url to the user
const conn = require('../bin/config.json');

// require it to create TOKEN to perform sign and verify operation 
var jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator');
// It methods are used to create the product according to user
exports.create_product = (req, res) => {
    var content = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    } else {
        // verify teh token to the user headers authorization
        jwt.verify(req.headers.authorization, conn[1].key, (err, data) => {
            if (err) {
                res.send(err)
            } else {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(422).json({ errors: errors.array() });
                } else {

                }
                var datass = {
                        f_name: data.firstName,
                        l_name: data.lastName,
                        email: data.email,
                        review: data.reviews
                    }
                    // create an object and store the value into the schema
                var obj = new db_product({
                        p_name: content.p_name,
                        p_desc: content.p_desc,
                        p_image: content.p_image,
                        obj_id: data.id,
                        reviews: data.reviews
                    })
                    // variable that can send through the response of the data
                var datab = {
                        p_name: content.p_name,
                        p_desc: content.p_desc,
                        p_image: content.p_image,
                        review: content.reviews,
                        user: datass

                    }
                    // save the data into the product schema
                obj.save((err, data) => {
                    if (!err) {
                        res.json({
                            sucess: true,
                            message: "Product Add Successfully",
                            data: datab
                        })
                    } else { res.send(err) }
                })
            }

            // store the value of user data that are show on response

        })

    }

}




// delete the product according to its Id

exports.delete_product = (req, res) => {
    jwt.verify(req.headers.authorization, conn[1].key, (err, data) => {
        if (err) {
            res.send(err)
        } else {
            var p_id = req.params.id
                // here deleteone command are used to delete the product according to its product id
            db_product.deleteOne({ _id: p_id }, (err, doc) => {
                if (doc.deletedCount === 0) {

                    return res.json({
                        sucess: false,
                        message: "Product Not Found"
                    });

                } else {
                    return res.json({
                        sucess: true,
                        message: "Product Deleted",
                        data: [""]
                    })
                }
            })
        }

    })

}



// update the product record according to product id

exports.update_product = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    } else {
        jwt.verify(req.headers.authorization, conn[1].key, (err, data) => {
            if (err) {
                res.send(err)
            } else {
                var datass = {
                    f_name: data.firstName,
                    l_name: data.lastName,
                    email: data.email
                }
                var pro_id = req.params.id
                var content = req.body
                db_product.findOneAndUpdate({ _id: pro_id }, content, { new: true }, (err, doc) => {
                    var datab = {
                        p_id: pro_id,
                        p_name: doc.p_name,
                        p_desc: doc.p_desc,
                        p_image: doc.p_image,
                        reviews: doc.reviews,
                        user: datass
                    }
                    if (doc === null) {

                        return res.json({
                            sucess: false,
                            message: "Product Id Not Matched"
                        })

                    } else {
                        res.json({
                            success: true,
                            message: "Product Updated Successfully",
                            data: datab
                        })

                    }
                })
            }

        });

    }
}


// Show the product of the user

exports.show_user_products = (req, res) => {
    jwt.verify(req.headers.authorization, conn[1].key, (err, data) => {
        if (!err) {
            db_product.find({ _id: req.params.id }).populate("obj_id").exec(function(err, story) {
                if (err) {
                    res.send(err)
                } else {
                    db_review.find({ product_id: req.params.id }, (err, data) => {
                        if (err) {
                            res.send(err)
                        } else {
                            var review = []
                            for (i = 0; i <= data.length.toString() - 1; i++) {
                                var datass = data[i].review_message;
                                review.push(datass);
                            }
                            story[0].reviews = review;
                            res.send(story)
                        }
                    })
                }
            });
        } else {
            res.send(err)
        }
        // z[0].reviews = y

        // var id = req.params.id;
        // var datass = {
        //     f_name: data.firstName,
        //     l_name: data.lastName,
        //     email: data.email
        // }
        // db_product.find({ _id: id }, (err, data) => {

        //     var datab = {
        //         p_id: id,
        //         p_name: data[0].p_name,
        //         p_desc: data[0].p_desc,
        //         p_image: data[0].p_image,
        //         obj_id: data[0].obj_id,
        //         user: datass
        //     }
        //     if (data.length) {
        //         return res.json({
        //             sucess: true,
        //             message: "Products  are Displayed",
        //             data: datab
        //         })
        //     } else {
        //         res.send('no product for uthis user id')
        //     }
        // })
    })
}

exports.show_all_products = (req, res) => {
    db_product.find({}, (err, data) => {
        if (err) {
            res.json(err)
        } else {
            res.json(data)
        }
    })
}

module.exports.productsstore = (req, res) => {
    u_id = req.params.id;
    db_product.find({ _id: u_id }, (error, result) => {
        if (result.length > 0) {
            res.status(200).json({ success: false, message: "This product no already available" });
        } else {
            var product = new db_product({
                obj_id: u_id,
                p_name: req.body.p_name,
                p_desc: req.body.p_desc,
                p_image: req.body.p_image
            });
            product.save((error, result) => {
                if (error) {
                    res.status(500).json({ success: false, error: error.message });
                } else {
                    res.status(200).json({ success: true, message: 'product store' });
                }
            });
        }
    });
}

module.exports.get = (req, res, next) => {


    db_product.find((error, result) => {

        if (result.length > 0) {
            res.status(200).json({ status: "sucess", message: "product found", data: result });
        } else {
            res.status(500).json({ status: "failure", message: "product not found" });
        }
    });


}


module.exports.getById = (req, res, _id, next) => {

    console.log(_id);
    db_product.find({ _id: _id }, (error, result) => {

        if (result.length > 0) {
            res.status(200).json({ status: "success", message: 'product found', data: result });
        } else {
            res.status(500).json({ status: "failure", message: "product not found" });
        }
    });


}



module.exports.productsupdate = (req, res, id) => {

    db_product.find({ _id: id }, (error, result) => {

        if (result.length > 0) {
            db_product.update({ _id: id }, req.body, (error, result) => {
                if (error) {
                    res.status(500).json({ success: false, message: "problem is not update" });
                } else {
                    res.status(200).json({ success: true, message: 'product update' });
                }
            });
        } else {
            res.status(500).json({ success: false, message: "data not found" });
        }
    });


}


module.exports.productsdelete = (req, res, id) => {
    db_product.find({ _id: id }, (error, result) => {
        if (result.length > 0) {
            db_product.remove({ _id: id }, (error, result) => {
                if (error) {
                    res.status(500).json({ success: false, message: "problem in delete" });
                } else {
                    res.status(200).json({ success: true, message: "product deleted", data: result });
                }
            });
        } else {
            res.status(500).json({ success: false, message: "data not found" });
        }
    });
}

module.exports.getById = (req, res, id) => {
    db_product.find({ _id: id }, (error, result) => {
        if (result) {
            res.status(200).json({ success: true, message: 'product found', data: result });
        } else {
            res.status(500).json({ success: false, message: "product not found" });
        }
    });
}