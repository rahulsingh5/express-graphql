"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var axios = require("axios");
var _ = require("lodash");
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
        },
        users: {
            type: new graphql_1.GraphQLList(UserType),
            resolve: function (parentValue, args) {
                return axios.get("http://localhost:3000/users").then(function (res) { return res.data; });
            }
        }
    }
});
var mutation = new graphql_1.GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                age: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
                companyId: { type: graphql_1.GraphQLString }
            },
            resolve: function (parentValue, _a) {
                var name = _a.name, age = _a.age;
                return axios.post("http://localhost:3000/users", { name: name, age: age }).then(function (res) { return res.data; });
            }
        },
        editUser: {
            type: UserType,
            args: {
                id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                name: { type: graphql_1.GraphQLString },
                age: { type: graphql_1.GraphQLInt },
                companyId: { type: graphql_1.GraphQLString }
            },
            resolve: function (parentValue, args) {
                var body = {};
                _.forOwn(args, function (value, key) {
                    if (key !== 'id') {
                        body["" + key] = value;
                    }
                });
                return axios.patch("http://localhost:3000/users/" + args.id, body).then(function (res) { return res.data; });
            }
        },
        deleteUser: {
            type: UserType,
            args: {
                id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
            },
            resolve: function (parentValue, _a) {
                var id = _a.id;
                return axios.delete("http://localhost:3000/users/" + id).then(function (res) { return res.data; });
            }
        }
    }
});
exports.schema = new graphql_1.GraphQLSchema({
    query: RootQueryType,
    mutation: mutation
});
