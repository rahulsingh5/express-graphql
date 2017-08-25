import * as graphql from 'graphql';
import { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
import * as axios from 'axios';

const CompanyType = new GraphQLObjectType({
    name: 'Company',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        users: {
            type: new GraphQLList(UserType),
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/companies/${parentValue.id}/users`).then((res: any) => res.data);
            }
        }
    })
});

const UserType: any = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        company: {
            type: CompanyType,
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`).then(((res: any) => res.data));
            }
        }
    })
});


const RootQueryType = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        user: {
            type: UserType,
            args: {id: {type: GraphQLString}},
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/users/${args.id}`).then((res: any) => res.data);
            }
        },
        company: {
            type: CompanyType,
            args: {id: {type: GraphQLString}},
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/companies/${args.id}`).then((res: any) => res.data);
            }
        }
    }
});

export const schema = new GraphQLSchema({
    query: RootQueryType
});