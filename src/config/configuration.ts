import { Dialect } from "sequelize";

const env = process.env
export default () => ({
  port: env.PORT,
  dielect: env.DIALECT as Dialect,
  storage: env.STORAGE,
  autoLoadModels: env.AUTOLOADMODELS === 'true',
  alter: env.ALTER === 'true',
  logging: env.LOGGING === 'true'
})