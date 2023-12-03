import { BadRequestException, Injectable, ServiceUnavailableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GetSubjectDto, NewSubjectDto, UpdateSubjectDto } from 'src/DTO/subject.dto';
import SubjectModel from 'src/models/subject.model';
import { Utils } from '../utils/utils.service';

@Injectable()
export class SubjectService {
  constructor(
    @InjectModel(SubjectModel)
    private model: typeof SubjectModel,
    private utils: Utils
  ) { }

  async getSubjects(query?: GetSubjectDto) {
    return await this.model.findAll({ where: this.utils.extractSearchDate(query) })
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
