"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var config_1 = require("./config");
var app = express();
app.use('/v1/graphql', require('./routes/userRoutes')());
app.listen(config_1.config.port, function () {
    console.log("Server is listening at http://localhost:" + config_1.config.port);
});
