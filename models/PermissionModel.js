const mongoose = require('mongoose');
const Conn = require('./connectToMongo');
const Schema = mongoose.Schema;

const permissionSchema = new Schema({
    Group: { type: mongoose.Types.ObjectId, ref: 'Groups'},
    User: { type: mongoose.Types.ObjectId, ref: 'Users'},
})

const groupSchema = new Schema({
    name: String,
    AllowedObjects: { type: mongoose.Types.ObjectId, ref: 'Objects'}
})

const objectSchema = new Schema({
    name: String,
    explanation: String
})

const Permissions = Conn.model("Permissions", permissionSchema);
const Groups = Conn.model("Groups", groupSchema);
const Objects = Conn.model("Objects", objectSchema);

module.exports = {
    Permissions,
    Groups,
    Objects
}
