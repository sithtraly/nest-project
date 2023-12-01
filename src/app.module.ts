import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './controllers/users/users.controller';
import { UserService } from './services/users/users.service';
import { ConfigModule } from '@nestjs/config';
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
import { UtilsService } from './services/utils/utils.service';
import config from './config/db.config';

let envPath: string
let db: any
if (process.env.NODE_ENV === 'dev') {
  envPath = '.env'
  db = config.dev
} else {
  envPath = '.env.prod'
  db = config.prod
}

@ApiBearerAuth()
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: envPath }),
    SequelizeModule.forRoot(db()),
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
    UtilsService,
  ],
})
export class AppModule { }
