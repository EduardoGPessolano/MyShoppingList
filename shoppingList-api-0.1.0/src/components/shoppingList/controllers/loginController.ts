import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export class LoginController {
  doLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(401)
        .json({ message: "O usuario aluno@upf já usa a senha 123" });
    }

    if (email === "eduardo@upf" && password === 123) {
      const token = jwt.sign(
        {
          auth: true,
          email: email,
        },
        process.env.TOKEN_KEY!,
        { expiresIn: "1h" }
      );
      return res.status(200).json({
        auth: true,
        token: token,
        message: "Logou com sucesso",
      });
    } else {
      return res.status(401).send("Não autorizado");
    }

    return res.status(500).send("Deu ruim");
  };
}
