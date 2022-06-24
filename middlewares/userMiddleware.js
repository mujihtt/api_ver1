const Users = require('./../models/UserModel');
const bcrypt = require('bcrypt');


module.exports = {
    addUser: async (req, res) => {
        const body = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(body.password, salt);
        body.password = hashedPassword;

        const newUser = new Users(body);
        newUser.save((err,savedUser) => {
            if(err){
                res.status(400).send(err);
            }else{
                const user = savedUser;
                user.password = undefined;
                user.__v = undefined;
                res.send(user);
            }
        })
    },
    getUsers: async (req,res) => {
        const filter = {};
        try{
            const users = await Users.find(filter);
            res.send(users);
        }catch (e) {
            res.status(500).send(e);
        }
    },
    getUniqueUser: async (req, res) => {
        try{
            const user = await Users.findById(req.params.id, {password: 0});
            res.send(user);
        }catch (e) {
            res.status(500).send(e);
        }
    },
    updateUser: async (req, res) => {
        const updateData = req.body;
        const id = req.params.id;
        try {
            await Users.updateOne({_id: id}, {$set: updateData});
            const updatedUser = await Users.findById(id, {password: 0});
            res.send(updatedUser);

        } catch (e) {
            res.status(500).send(e);
        }
    },
    deleteUser: async (req, res) => {
        const id = req.params.id;

    },

}
