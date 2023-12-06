import { Injectable } from '@nestjs/common';
import { Op } from 'sequelize';

@Injectable()
export class Utils {
  extractSearchDate(query: any) {
    const seachData: any = {}
    if (query.id) seachData.id = query.id
    if (query.startDate && query.endDate) {
      const start = new TDate(query.startDate)
      const end = new TDate(query.endDate)
      end.addDay(1)
      seachData.createdAt = { [Op.between]: [start.getDate(), end.getDate()] }
    } else {
      if (query.startDate) seachData.createdAt = { [Op.gt]: new TDate(query.startDate).getDate() }
      if (query.endDate) {
        const end = new TDate(query.endDate)
        end.addDay(1)
        seachData.createdAt = { [Op.lt]: end.getDate() }
      }
    }
    return seachData
  }
} 

export class TDate {
  private date: Date

  constructor(date?: string | number | Date) {
    this.date = new Date(date || new Date())
  }

  getDate() {
    return this.date
  }

  addSecond(second: number): void {
    this.date.setSeconds(this.date.getSeconds() + second)
  }

  addMinute(minute: number): void {
    this.date.setMinutes(this.date.getMinutes() + minute)
  }

  addHour(hour: number): void {
    this.date.setHours(this.date.getHours() + hour)
  }

  addDay(day: number): void {
    this.date.setDate(this.date.getDate() + day)
  }

  addMonth(month: number): void {
    this.date.setMonth(this.date.getMonth() + month)
  }

  addYear(year: number): void {
    this.date.setFullYear(this.date.getFullYear() + year)
  }
}