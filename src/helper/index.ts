import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

class App {
  static hashPassword(password: any) {
    const hash = bcrypt.hashSync(password, 8);
    return hash;
  }
  static isPasswordEqual(plainPassword: any, hashPassword: any) {
    return bcrypt.compareSync(plainPassword, hashPassword);
  }
  static generateUUID() {
    return crypto.randomBytes(6).toString("hex");
  }
  static assignToken(payload: any, expiresTime: any) {
    const token = jwt.sign(
      payload,
      process.env.SECRET_KEY || "charlesisawseosome",
      {
        expiresIn: expiresTime ? expiresTime : "2h",
      }
    );
    return token;
  }
  static decodeToken(token: any) {
    return new Promise((resolve, reject) => {
      try {
        const decoded = jwt.verify(
          token,
          process.env.SECRET_KEY || "charlesisawesome"
        );
        resolve(decoded);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default App;
