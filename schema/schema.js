"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var axios = require("axios");
var CompanyType = new graphql_1.GraphQLObjectType({
    name: 'Company',
    fields: function () { return ({
        id: { type: graphql_1.GraphQLString },
        name: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
        users: {
            type: new graphql_1.GraphQLList(UserType),
            resolve: function (parentValue, args) {
                return axios.get("http://localhost:3000/companies/" + parentValue.id + "/users").then(function (res) { return res.data; });
            }
        }
    }); }
});
var UserType = new graphql_1.GraphQLObjectType({
    name: 'User',
    fields: function () { return ({
        id: { type: graphql_1.GraphQLString },
        name: { type: graphql_1.GraphQLString },
        age: { type: graphql_1.GraphQLInt },
        company: {
            type: CompanyType,
            resolve: function (parentValue, args) {
                return axios.get("http://localhost:3000/companies/" + parentValue.companyId).then((function (res) { return res.data; }));
            }
        }
    }); }
});
var RootQueryType = new graphql_1.GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: graphql_1.GraphQLString } },
            resolve: function (parentValue, args) {
                return axios.get("http://localhost:3000/users/" + args.id).then(function (res) { return res.data; });
            }
        },
        company: {
            type: CompanyType,
            args: { id: { type: graphql_1.GraphQLString } },
            resolve: function (parentValue, args) {
                return axios.get("http://localhost:3000/companies/" + args.id).then(function (res) { return res.data; });
            }
        }
    }
});
exports.schema = new graphql_1.GraphQLSchema({
    query: RootQueryType
});
