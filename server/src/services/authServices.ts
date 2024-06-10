import db from "../db";
import { registerSchema } from "../lib/validations/register";
import { IRegister } from "../types/app";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default new (class authServices {
  async register(payload: IRegister) {
    const { error, value } = registerSchema.validate(payload);

    if (error) {
      throw new Error(error.details[0].message);
    }

    const isExists = await db.user.findFirst({
      where: {
        OR: [
          {
            username: value.username,
          },
          {
            email: value.email,
          },
        ],
      },
    });

    if (isExists) {
      throw new Error("Username or email already exists");
    }

    const hashedPassword = await bcrypt.hash(value.password, 10);

    value.password = hashedPassword;

    const user = await db.user.create({
      data: {
        ...value,
      },
    });

    const profile = await db.profile.create({
      data: {
        userId: user.id,
      },
    });

    return { user, profile };
  }

  async login(username: string, password: string) {
    const user = await db.user.findFirst({
      where: {
        OR: [
          {
            username,
          },
          {
            email: username,
          },
        ],
      },
      include: {
        profile: true,
      }
    });
    if (!user) {
      throw new Error("Invalid username or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Invalid username or password");
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY!, {
      expiresIn: "1d",
    });

    return token;
  }

  async check(id: number) {
    const user = await db.user.findFirst({
      where: {
        id: id,
      },
      include: {
        profile: true,
      }
    });

    if (!user) {
      throw new Error("Unauthorized");
    }

    const { password, ...data } = user;

    return data;
  }
})();
