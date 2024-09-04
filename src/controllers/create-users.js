import { CreateUserUseCase } from '../useCases/create-user.js';
import validator from 'validator';
import { badRequest, created, serverError } from './helpers.js';

export class CreateUserController {
    async execute(httpRequest) {
        try {
            const params = httpRequest.body;
            const requiredFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ];

            for (const field of requiredFields) {
                if (!params[field] || params[field].trim().length === 0) {
                    return badRequest({
                        message: `Missing params, ${field} is required`,
                    });
                }
            }

            const passwordIsValid = params.password.trim().length < 6;
            if (passwordIsValid) {
                return badRequest({
                    message: 'Password must have at least 6 characters',
                });
            }

            const emailIsValid = validator.isEmail(params.email);
            if (!emailIsValid) {
                return badRequest({
                    message: 'Invalid email, please provide a valid email',
                });
            }

            const createUserUseCase = new CreateUserUseCase();
            const createdUser = await createUserUseCase.execute(params);

            return created(createdUser);
        } catch (error) {
            console.log(error);
            return serverError({
                message: error.message,
            });
        }
    }
}
