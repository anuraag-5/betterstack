import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => {
    res.json({
        message: "Welcome to user router."
    });
});

export default userRouter;