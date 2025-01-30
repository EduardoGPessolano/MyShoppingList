import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const secret = process.env.NEXTAUTH_SECRET;

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  console.log("authHeader API: ", authHeader);

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }
  const token = authHeader.split(" ")[1];

  jwt.verify(token!, process.env.TOKEN_KEY!, function (err: any, decoded: any) {
    if (err) {
      return res.status(500).json({
        auth: false,
        message: err,
      });
    }
    req.params.token = token!;
    next();
  });
};
