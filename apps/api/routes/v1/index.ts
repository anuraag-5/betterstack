import { Router } from "express";
import websiteRouter from "./websiteRouter";
import userRouter from "./websiteRouter";

const mainRouter = Router();

mainRouter.use("/website", websiteRouter);
mainRouter.use("/user", userRouter);

export default mainRouter;