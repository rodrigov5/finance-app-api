import 'dotenv/config.js';
import express from 'express';

const app = express();
app.use(express.json());

app.listen(process.env.port, () =>
    console.log(`Server is running on port ${process.env.port}`)
);
