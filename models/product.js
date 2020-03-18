const db = require('./db');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var schema = db.Schema({
    p_name: { type: String, required: true, trim: true },
    p_desc: { type: String, required: true, trim: true },
    p_image: { type: String, required: true },
    obj_id: { type: Schema.Types.ObjectId, ref: 'user' },
    reviews: { type: Array }
});
// compilation of schema 
module.exports = db.model('productdata', schema, 'product')