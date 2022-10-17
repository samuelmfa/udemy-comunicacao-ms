import UserRepository from "../repository/UserRepository.js";
import * as httpStatus from "../../../config/constants/httpStatus.js";
import UserExeption from "../exeption/UserExeption.js";

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
}

export default new UserService();
