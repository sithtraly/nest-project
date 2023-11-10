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
  newStudent(@Body() data: NewStudentDto) {
    return this.studentService.newStudent(data)
  }

  @Put('update-student')
  updateStudent(@Request() req: { params: any, query: any }, @Body() data: updateStudentDto) {
    const id = req.query.id || data.id
    if (!id) {
      throw new BadRequestException('id should not be empty')
    }
    return this.studentService.updateStudent(id, data)
  }
}
