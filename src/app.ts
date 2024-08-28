import Fastify from "fastify";
import { Routes } from "./http/routes";
export const App = Fastify()


App.register(Routes)
