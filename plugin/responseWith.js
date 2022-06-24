module.exports = (status, data = null) => {
    return (req, res, next) => {
        if(data !== null){
            res.status(status)
            res.send(data);
        }else{
            res.status(status)
            res.end();
        }
        next();
    }
}
