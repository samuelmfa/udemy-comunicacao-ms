import bcrypt from "bcrypt";
import User from "../../modules/user/model/User.js";

export async function createInitialData() {
  try {
    await User.sync({ force: true });

    let password = await bcrypt.hash("123456", 10);

    await User.create({
      name: "samuel",
      email: "samuel@samuel.com",
      password: password,
    }).then((usuario) => {
      console.log(usuario);
    });
    
  } catch (e) {
    console.log("Erro ao criar usuario");
    console.log(e.message);
  }
}
