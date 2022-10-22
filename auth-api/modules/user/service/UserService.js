import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import UserRepository from "../repository/UserRepository.js";
import * as httpStatus from "../../../config/constants/httpStatus.js";
import UserExeption from "../exeption/UserExeption.js";
import * as secret from '../../../config/constants/secret.js'

class UserService {
  async findByEmail(req) {
    try {
      const { email } = req.params;

      this.validarDadosDaRequisicao(email);
      const user = await UserRepository.findByEmail(email);
      this.validadeUserNotFound(user);

      return {
        status: httpStatus.SUCCESS,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      };
    } catch (error) {
      return {
        status: error.status ? error.status : httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  validarDadosDaRequisicao(email) {
    if (!email) {
      throw new UserExeption(
        httpStatus.BAD_REQUEST,
        "User email não foi informado"
      );
    }
  }
  validadeUserNotFound(user) {
    if (!user) {
      throw new UserExeption(
        httpStatus.BAD_REQUEST,
        "User usuario não foi informado"
      );
    }
  }

  async getAccessToken(res, req) {
    try {
      const { email, password } = req.body;
      this.validateAccessTokenData(email, password);
      let user = await UserRepository.findByEmail(email);
      this.validadeUserNotFound(user);
      await this.validatePassword(password, user.password);
      const authUser = { id: user.id, name: user.name, email: user.email };
      const accessToken = jwt.sign({authUser}, secret.API_SECRET,{expiresIn:'1d'});
      return {
        status: httpStatus.SUCCESS,
        accessToken,
      }
    } catch (error) {
      return {
        status: error.status ? error.status : httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  validateAccessTokenData(email, password) {
    if (!email || !password) {
      throw new UserExeption(
        httpStatus.UNAUTHORIZED,
        "Email e senha devem ser informados!"
      );
    }
  }
  async validatePassword(password, hashPassword) {
    if (!(await bcrypt.compare(password, hashPassword))) {
      throw new UserExeption(httpStatus.UNAUTHORIZED, "Senha incorreta");
    }
  }
}

export default new UserService();
