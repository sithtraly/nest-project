import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './controllers/users/users.controller';
import { UserService } from './services/users/users.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { SequelizeModule } from '@nestjs/sequelize';
import { BcryptService } from './services/bcrypt/bcrypt.service';
import { AuthService } from './services/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './services/auth/auth.controller';
import { RoleService } from './services/profile/role.service';
import { ProfileController } from './controllers/role/role.controller';
import models from './models/model'
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './services/role/roles.guard';
import { QrCodeController } from './controllers/qr-code/qr-code.controller';
import { QrCodeService } from './services/qr-code/qr-code.service';

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
      models: models
    }),
    // SequelizeModule.forRoot({
    //   dialect: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   database: 'nest-project',
    //   username: 'root',
    //   password: '',
    //   autoLoadModels: true,
    //   sync: {
    //     alter: true
    //   },
    //   models
    // }),
    SequelizeModule.forFeature(models),
    JwtModule.register({
      global: true,
      secret: '123'
    })
  ],
  controllers: [
    AuthController,
    AppController,
    UserController,
    ProfileController,
    QrCodeController
  ],
  providers: [
    AppService,
    UserService,
    BcryptService,
    AuthService,
    RoleService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    },
    QrCodeService
  ],
})
export class AppModule { }
