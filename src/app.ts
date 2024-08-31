import Fastify from 'fastify';

import { Routes } from './http/routes.js';



export const App = Fastify()




App.register(Routes)

