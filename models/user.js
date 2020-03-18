const db = require('./db');
const mongoose = require('mongoose');
var schema = db.Schema({
    f_name: { type: String, required: true, trim: true },
    l_name: { type: String, required: true, trim: true },
    email: {
        type: String,
        required: true
    },
    password: { type: String, required: true, trim: true }
});

schema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.__v;
    return obj;
}



// compilation of schema 
module.exports = db.model('user', schema)