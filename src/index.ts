import express from 'express';
import dotenv from 'dotenv';
import { router as v1UserRouter } from './v1/routes/userRoutes';
import { router as v1BlockRouter } from './v1/routes/blockRoutes';
import { router as v1NodeRouter } from './v1/routes/nodeRoutes';
const { swaggerDocs: V1SwaggerDocs } = require("./v1/swagger");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/v1/users', v1UserRouter);
app.use('/api/v1/blocks', v1BlockRouter);
app.use('/api/v1/nodes', v1NodeRouter);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
    V1SwaggerDocs(app, PORT);
})