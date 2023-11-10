import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import NewStudentDto, { updateStudentDto } from 'src/DTO/student.dto';
import StudentsModel from 'src/models/student.model';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(StudentsModel)
    private model: typeof StudentsModel
  ) { }

  async getStudents(id?: number) {
    if (id) return await this.model.findByPk(id)
    return await this.model.findAll()
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
