const mongoose = require('mongoose');
const dbConfig = require('./../configs/database.json');
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
const connection = mongoose.createConnection(`mongodb://localhost:${dbConfig.port}/${dbConfig.db}`, options);

module.exports = connection;
