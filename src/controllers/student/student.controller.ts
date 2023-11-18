import { BadRequestException, Body, Controller, Get, Param, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import NewStudentDto, { GetStudentDto, updateStudentDto } from 'src/DTO/student.dto';
import { AuthGuard } from 'src/services/auth/auth.guard';
import { StudentService } from 'src/services/student/student.service';

@UseGuards(AuthGuard)
@ApiTags('Students')
@ApiBearerAuth()
@Controller('students')
export class StudentController {
  constructor(
    private studentService: StudentService
  ) { }

  @Get()
  get(@Query() query: GetStudentDto) {
    const id = query.id
    return this.studentService.getStudents(id)
  }

  @Post('new-student')
  newStudent(@Body() body: NewStudentDto) {
    return this.studentService.newStudent(body)
  }

  @Put('update-student')
  updateStudent(@Request() req: { params: any, query: any }, @Body() body: updateStudentDto) {
    const id = req.query.id || body.id
    if (!id) {
      throw new BadRequestException('id should not be empty')
    }
    return this.studentService.updateStudent(id, body)
  }
}
