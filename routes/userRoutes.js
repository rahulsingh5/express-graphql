"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var expressGraphQL = require("express-graphql");
var schema_1 = require("../schema/schema");
function UserRouter() {
    var router = express.Router();
    router.use('/', expressGraphQL({
        schema: schema_1.schema,
        graphiql: true
    }));
    return router;
}
module.exports = UserRouter;
