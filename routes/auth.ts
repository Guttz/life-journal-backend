import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import { Container } from 'typedi';

const router = Router();

router.post('/login', Container.get(AuthController).login);

export default router;
