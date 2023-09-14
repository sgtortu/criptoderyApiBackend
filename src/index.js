const express = require('express');
const v1UserRouter = require('../src/v1/routes/userRoutes');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/v1/users', v1UserRouter);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
})