import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const header = req.headers.authorization;
  if (!header) {
    res.status(403).json({ message: "No authorization header" });
    return;
  }

  try {
    const data = jwt.verify(header, process.env.JWT_SECRET!);
    if (typeof data !== "object" || !("sub" in data)) {
      res.status(403).json({ message: "Invalid token" });
      return;
    }

    req.userId = data.sub as string;
    next();
  } catch (_error) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
}