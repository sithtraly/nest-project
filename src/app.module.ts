import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './controller/users/users.controller';
import { UserService } from './services/users/users.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './models/user.model';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: 'src/config/database.sqlite',
      autoLoadModels: true,
      sync: {
        alter: true
      },
      models: [UserModel]
    })
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule { }
