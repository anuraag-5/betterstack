import { Router } from "express";
import websiteRouter from "./websiteRouter";
import userRouter from "./userRouter";

const mainRouter = Router();

mainRouter.use("/website", websiteRouter);
mainRouter.use("/users", userRouter);

export default mainRouter;