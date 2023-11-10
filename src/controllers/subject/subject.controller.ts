import { BadRequestException, Body, Controller, Get, Post, Put, Request } from '@nestjs/common';
import { NewSubjectDto, UpdateSubjectDto } from 'src/DTO/subject.dto';
import { SubjectService } from 'src/services/subject/subject.service';

@Controller('subjects')
export class SubjectController {
  constructor(
    private subjectService: SubjectService
  ) { }

  @Get()
  getSubjects() {
    return this.subjectService.getSubjects()
  }

  @Post()
  newSubject(@Body() body: NewSubjectDto) {
    return this.subjectService.newSubject(body)
  }

  @Put()
  updateSubject(@Request() req: { query: { id: number } }, @Body() body: UpdateSubjectDto) {
    const id = req.query.id || body.id
    if (!id) throw new BadRequestException('id should not be empty')
    return this.subjectService.updateSubject(id, body)
  }
}
