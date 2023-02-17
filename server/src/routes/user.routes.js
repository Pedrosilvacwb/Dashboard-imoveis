import { Router } from 'express';
import UserController from '../controllers/user.controller.js';

const userRoutes = Router();

const userController = new UserController();

userRoutes.get('/', userController.getAll);
userRoutes.post('/', userController.create);
userRoutes.get('/:id', userController.getOneById);

export default userRoutes;
