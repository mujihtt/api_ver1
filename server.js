const express = require('express');
const app = express();
const config = require('./configs/server.json');
const routes = require('./routes');
const appCustom = require('./plugin/appCustom');
const responseWith = require('./plugin/responseWith');

app.use(appCustom);
app.use(routes);

// send 404 status when route not found
app.use(responseWith(404));

app.listen(config.PORT, () => {
    console.log("server running on port: ", config.PORT);
})
