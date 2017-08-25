import * as express from 'express';
import * as expressGraphQL from 'express-graphql';

import { schema } from '../schema/schema';

function UserRouter() {
    const router = express.Router();

    router.use('/', expressGraphQL({
        schema,
        graphiql: true
    }));


    return router;

}

module.exports = UserRouter;