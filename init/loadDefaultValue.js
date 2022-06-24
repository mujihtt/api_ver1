const bcrypt = require('bcrypt');
const {Types} = require('mongoose');
const Users = require('./../models/UserModel');
const {
    Permissions,
    Groups,
    Objects
} = require('./../models/PermissionModel');


module.exports = async () => {
    //----permission model
    const defaultPermissions = new Permissions({

    })
    const defaultGroups = new Groups({

    })
    const defaultObjects = new Objects({
        name: 'public',
        explanation: 'Access public area',
        _id: Types.ObjectId('000000000000000000000001')
    })

    //----User model
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("123456", salt);
    const defaultUser = {
        username: 'example',
        password: hashedPassword,
        _id: Types.ObjectId('000000000000000000000000')
    }
}
