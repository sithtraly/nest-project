import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetTeacherDTO, NewTeacherDTO } from 'src/DTO/teacher.dto';
import { AuthGuard } from 'src/services/auth/auth.guard';
import { Role, Roles } from 'src/services/role/roles.decorator';
import { TeacherService } from 'src/services/teacher/teacher.service';

@Controller('teacher')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('Teacher')
@Roles(Role.admin)
export class TeacherController {
  constructor(
    private teacherService: TeacherService
  ) { }

  @Get()
  getTeacher(@Query() query: GetTeacherDTO) {
    return this.teacherService.getTeacher(query)
  }

  @Post()
  newTeacher(@Body() body: NewTeacherDTO) {
    return this.teacherService.newTeacher(body)
  }
}
