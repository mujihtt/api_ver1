const mongoose = require('mongoose');
const Conn = require('./connectToMongo');
const uniqueValidator = require('mongoose-unique-validator');

const usersSchema = mongoose.Schema({
    username: {type: String,require: true, unique: true},
    password: {type: String, require: true, get: () => undefined}
},{
    toJSON: {getters: true}
});

usersSchema.plugin(uniqueValidator);

module.exports = Conn.model("Users", usersSchema);

