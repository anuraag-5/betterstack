import { Router } from "express";
import express from "express";

const userRouter = Router();
userRouter.use(express.json());

userRouter.get("/", (req, res) => {
    res.json({
        message: "Welcome to user router."
    });
});

export default userRouter;