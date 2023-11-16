import { Dialect } from "sequelize";

function isBoolean(str: string) {
  return str.toLowerCase() == 'true'
}

const env = process.env
export default () => ({
  port: env.PORT,
  dielect: env.DIALECT as Dialect,
  storage: env.STORAGE,
  autoLoadModels: isBoolean(env.AUTOLOADMODELS),
  alter: isBoolean(env.ALTER),
  logging: isBoolean(env.LOGGING),
})