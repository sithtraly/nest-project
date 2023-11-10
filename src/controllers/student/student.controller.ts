import { BadRequestException, Body, Controller, Get, Param, Post, Put, Request } from '@nestjs/common';
import NewStudentDto, { updateStudentDto } from 'src/DTO/student.dto';
import { StudentService } from 'src/services/student/student.service';

@Controller('students')
export class StudentController {
  constructor(
    private studentService: StudentService
  ) { }

  @Get()
  get(@Request() req: { params: any, query: any }) {
    const id = req.query.id
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
