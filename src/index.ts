import express from 'express';
import dotenv from 'dotenv';
import { router as v1UserRouter } from './v1/routes/userRoutes';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/v1/users', v1UserRouter);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
})