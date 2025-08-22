import express, { Router } from "express";
import type { Request, Response } from "express";
import client from "store/client";
import { AuthInput } from "../../types";
import jwt from "jsonwebtoken";

const userRouter: Router = express.Router();
userRouter.use(express.json());

// @ts-ignore
userRouter.post("/signup", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user = await client.users.create({
      data: { email, password },
    });

    return res.status(201).json({ id: user.id });
  } catch (error: any) {
    console.error(error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// @ts-ignore
userRouter.post("/signin", async (req: Request, res: Response) => {
  const success = AuthInput.safeParse(req.body);
  if (!success.success) {
    res.status(403).send({
      meesage: "zod error"
    });
    return;
  }
  const data = success.data;
  const { username: email, password } = data;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user = await client.users.findFirst({
      where: {
        email,
        password,
      },
    });

    if (!user) return res.status(403).json({ message: "User not found" });

    let token = jwt.sign({
      sub: user.id
    }, process.env.JWT_SECRET!);

    res.cookie("user", user.id, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: false, // ✅ set to false for local dev
      sameSite: "lax",
    });

    return res.status(201).json({ jwt: token });
  } catch (error: any) {
    console.error(error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// @ts-ignore
userRouter.get("/user", (req, res) => {
  const { user } = req.cookies;

  if (!user)
    return res.status(400).json({
      isAuthenticated: false,
      user_id: null,
    });

  return res.status(201).json({
    isAuthenticated: true,
    user_id: user,
  });
});

export default userRouter;
