import { Sequelize } from "sequelize";

const sequelize = new Sequelize("auth-db", "postgres", "root", {
  host: "127.0.0.1",
  dialect: "postgres",
  quoteIdentifiers: false,
  define: {
    syncOnAssociation: true,
    timestamps: false,
    underscored: true,
    underscoredAll: true,
    freezeTableName: true,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("conexão foi estabecida");
  })
  .catch((error) => {
    console.log("Erro ao conectr no DB");
    console.log(error);
  });

export default sequelize;
