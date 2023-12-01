import { Dialect } from "sequelize"
import models from "src/models/.model"

const config = {
  dev: () => {
    return {
      dialect: process.env.DIALECT as Dialect,
      storage: process.env.STORAGE,
      autoLoadModels: true,
      models,
      sync: { alter: true },
      retryAttempts: 3,
    }
  },
  prod: () => {
    return {
      dialect: process.env.DIALECT as Dialect,
      uri: process.env.URI,
      logging: false,
      autoLoadModels: true,
      retryAttempts: 3,
      models,
      sync: { alter: true },
    }
  }
}

export default config