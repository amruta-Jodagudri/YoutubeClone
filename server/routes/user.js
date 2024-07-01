import express from 'express';

import { login } from '../controllers/auth.js';
import { getAllChanels, updateChanelData } from '../controllers/chanel.js';
import { updatePoints } from '../controllers/user.js';

const routes = express.Router();

routes.post('/login',login)
routes.patch('/update/:id',updateChanelData)
routes.get('/getAllChanels',getAllChanels)
routes.post('/updatePoints', updatePoints);
routes.get('/getPoints/:userId', getPoints);

export default routes;