import { Router } from 'express';
import PropertyController from '../controllers/property.controller.js';

const propertyRouter = Router();
const propertyController = new PropertyController();

propertyRouter.get('/', propertyController.getAll);
propertyRouter.post('/', propertyController.create);
propertyRouter.get('/:id', propertyController.getOneById);
propertyRouter.patch('/:id', propertyController.update);
propertyRouter.delete('/:id', propertyController.delete);

export default propertyRouter;
