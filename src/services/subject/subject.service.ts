import { BadRequestException, Injectable, ServiceUnavailableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { NewSubjectDto, UpdateSubjectDto } from 'src/DTO/subject.dto';
import SubjectModel from 'src/models/subject.model';

@Injectable()
export class SubjectService {
  constructor(
    @InjectModel(SubjectModel)
    private model: typeof SubjectModel
  ) { }

  async getSubjects() {
    return await this.model.findAll()
  }

  async getSubjectById(id: number) {
    return await this.model.findByPk(id)
  }

  async newSubject(data: NewSubjectDto) {
    try {
      return await this.model.create({ ...data })
    } catch (err) {
      console.log(err)
      throw new ServiceUnavailableException()
    }
  }

  async updateSubject(id: number, data: UpdateSubjectDto) {
    try {
      const subject = await this.model.findByPk(id)
      if (!subject) throw new BadRequestException('Subject not found')
      subject.subject = data.subject
      return await subject.save()
    } catch (err) {
      console.log(err)
      throw new ServiceUnavailableException()
    }
  }
}
