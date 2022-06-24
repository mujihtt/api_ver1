const jwt = require("jsonwebtoken");
const config = require("../configs/server.json");
const Users = require("../models/UserModel");
const bcrypt = require("bcrypt");
const tokenList = {};

module.exports = {
    authenticate: async (req, res) => {
        const postData = req.body;
        let user = await Users.findOne({username: postData.username});
        if(user){
            user = user.toObject();
            const cleanUser = {...user, password: undefined}
            const validPassword = await bcrypt.compare(postData.password, user.password);
            if(validPassword){
                const token = jwt.sign(cleanUser, config.SECRET, { expiresIn: '1h'});
                const refreshToken = jwt.sign(cleanUser, config.REFRESH_SECRET, { expiresIn: '1h'});
                const response = {
                    "status": "Logged In",
                    "token": token,
                    "refreshToken": refreshToken
                }
                tokenList[refreshToken] = response;
                res.status(200).json(response);
            }else{
                res.status(400).json({error: "Invalid Password"})
            }
        }else{
            res.status(401).json({ error: "User does not exist"});
        }
    },
    token: (req, res) => {
        const postData = req.body;
        if ((postData.refreshToken) && (postData.refreshToken in tokenList)) {
            const user = {...postData, refreshToken: undefined, token: undefined};
            const token = jwt.sign(user, config.SECRET, {expiresIn: config.REFRESH_SECRET});
            const response = {
                "token": token
            }
            tokenList[postData.refreshToken].token = token;
            res.status(200).json(response);
        } else {
            res.status(404).send("Invalid request");
        }
    },
    checkToken: (req, res, next) => {
        const token = req.body.token || req.query.token || req.headers['x-access-token']

        if(token) {
            jwt.verify(token, config.SECRET, function(err, decoded) {
                if(err){
                    return res.status(401).json({ error: true, message: "Unathorized access"})
                }
                req.decoded = decoded;
                next();
            })
        }else{
            return res.status(403).send({
                "error": true,
                "message": "No token provided"
            })
        }
    }
}
