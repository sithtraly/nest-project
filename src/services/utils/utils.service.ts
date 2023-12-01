import { Injectable } from '@nestjs/common';
import { Op } from 'sequelize';

@Injectable()
export class UtilsService {
  public static extractSearchDate(query: any) {
    const seachData: any = {}
    if (query.id) seachData.id = query.id
    if (query.startDate && query.endDate) {
      seachData.createdAt = { [Op.between]: [new Date(query.startDate), new Date(query.endDate)] }
    } else {
      if (query.startDate) seachData.createdAt = { [Op.gt]: new Date(query.startDate) }
      if (query.endDate) seachData.createdAt = { [Op.lt]: new Date(query.endDate) }
    }
    return seachData 
  }
}
