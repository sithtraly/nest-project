import { Module, ValidationPipe } from '@nestjs/common';
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
import models from './models/.model'
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { RolesGuard } from './services/role/roles.guard';
import { StudentController } from './controllers/student/student.controller';
import { StudentService } from './services/student/student.service';
import { SubjectController } from './controllers/subject/subject.controller';
import { SubjectService } from './services/subject/subject.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    SequelizeModule.forRoot({
      dialect: configuration().dielect,
      storage: configuration().storage,
      autoLoadModels: configuration().autoLoadModels,
      sync: {
        alter: configuration().alter
      },
      models: models,
      logging: configuration().logging,
      retryAttempts: 3
    }),
    SequelizeModule.forFeature(models),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET
    })
  ],
  controllers: [
    AuthController,
    AppController,
    UserController,
    ProfileController,
    StudentController,
    SubjectController
  ],
  providers: [
    AppService,
    UserService,
    BcryptService,
    AuthService,
    RoleService,
    StudentService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    SubjectService,
  ],
})
export class AppModule { }
