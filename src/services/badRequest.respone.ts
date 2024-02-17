import { BadRequestException } from "@nestjs/common";

export class BadRequestRespone {
  constructor({ message = 'bad request', data = {} }) {
    throw new BadRequestException({
      statusCode: 400,
      message,
      ...data,
    })
  }
}