import * as express from 'express';

import { config } from './config';

const app = express();

app.use('/v1/graphql', require('./routes/userRoutes')());

app.listen(config.port, () => {
    console.log(`Server is listening at http://localhost:${config.port}`);
});
