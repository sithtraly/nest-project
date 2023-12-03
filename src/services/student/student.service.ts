import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import NewStudentDto, { GetStudentDto, updateStudentDto } from 'src/DTO/student.dto';
import StudentsModel from 'src/models/student.model';
import { Utils } from '../utils/utils.service';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(StudentsModel)
    private model: typeof StudentsModel,
    private utils: Utils
  ) { }

  async getStudents(id?: number, teacherId?: number, query?: GetStudentDto) {
    const search: any = {}
    if (id) search.id = id
    if (teacherId) search.teacherId = teacherId
    return await this.model.findAll({ where: { ...search, ...this.utils.extractSearchDate(query) } }) || []
  }

  async newStudent(dataDto: NewStudentDto) {
    try {
      return await this.model.create({ ...dataDto })
    } catch (err) {
      throw err
    }
  }

  async updateStudent(id: number, dataDto: updateStudentDto) {
    try {
      let student = await this.model.findByPk(id)
      if (!student) throw new BadRequestException('Student not found')
      for (let key of Object.keys(dataDto)) {
        if (key === 'id') continue
        if (student[key] !== dataDto[key]) student[key] = dataDto[key]
      }
      return await student.save()
    } catch (err) {
      throw err
    }
  }
}
