import { BadRequestException, Body, Controller, Get, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';
import { GetSubjectDto, NewSubjectDto, UpdateSubjectDto } from 'src/DTO/subject.dto';
import { AuthGuard } from 'src/services/auth/auth.guard';
import { SubjectService } from 'src/services/subject/subject.service';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('Subject')
@Controller('subjects')
export class SubjectController {
  constructor(
    private subjectService: SubjectService
  ) { }

  @ApiProperty()
  @Get()
  getSubjects(@Query() query: GetSubjectDto) {
    if (query.id) return this.subjectService.getSubjects(query.id)
    return this.subjectService.getSubjects()
  }

  @ApiBody({ type: NewSubjectDto })
  @Post()
  newSubject(@Body() body: NewSubjectDto) {
    return this.subjectService.newSubject(body)
  }

  @Put()
  updateSubject(@Query() query: any, @Body() body: UpdateSubjectDto) {
    const id = query.id || body.id
    if (!id) throw new BadRequestException('id should not be empty')
    return this.subjectService.updateSubject(id, body)
  }
}
