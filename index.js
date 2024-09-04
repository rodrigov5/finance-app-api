import 'dotenv/config.js';
import express from 'express';
import { CreateUserController } from './src/controllers/create-users.js';

const app = express();
app.use(express.json());

app.post('/api/users', async (request, response) => {
    const createUserController = new CreateUserController();
    const { statusCode, body } = await createUserController.execute(request);

    response.status(statusCode).json(body);
});

app.listen(process.env.port, () =>
    console.log(`Server is running on port ${process.env.port}`),
);
