import { BadRequestException, Body, Controller, Get, Param, Post, Put, Query, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import NewStudentDto, { GetStudentDto, updateStudentDto } from 'src/DTO/student.dto';
import { AuthGuard } from 'src/services/auth/auth.guard';
import { ExcelService } from 'src/services/excel/excel.service';
import { Role, Roles } from 'src/services/role/roles.decorator';
import { StudentService } from 'src/services/student/student.service';
import { Utils } from 'src/services/utils/utils.service';

@UseGuards(AuthGuard)
@ApiTags('Students')
@ApiBearerAuth()
@Controller('students')
export class StudentController {
  constructor(
    private studentService: StudentService,
    private utils: Utils,
    private excelService: ExcelService
  ) { }

  @Get()
  get(@Query() query: GetStudentDto, @Request() req: any) {
    const id = query.id
    const teacherId = req.user.id
    return this.studentService.getStudents(id, teacherId, query)
  }

  @Roles(Role.teacher)
  @Post()
  newStudent(@Body() body: NewStudentDto, @Request() req: any) {
    body.teacherId = req.user.id
    return this.studentService.newStudent(body)
  }

  @Post('batch')
  @Roles(Role.admin, Role.teacher)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async newStudents(@UploadedFile() file: Express.Multer.File) {
    const data = await this.excelService.read2Json(file.path)
    return await this.studentService.newStudents(data)
  }

  @Roles(Role.teacher)
  @Put()
  updateStudent(@Request() req: { params: any, query: any }, @Body() body: updateStudentDto) {
    const id = req.query.id || body.id
    if (!id) {
      throw new BadRequestException('id should not be empty')
    }
    return this.studentService.updateStudent(id, body)
  }
}
