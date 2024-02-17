import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { QrCodeModel } from 'src/models/qr-code.model';
import * as qrCode from 'qrcode'
import { join } from 'path';

@Injectable()
export class QrCodeService {
  constructor(
    @InjectModel(QrCodeModel) private qrModel: typeof QrCodeModel
  ) { }

  async generate(url: string, owner: number, lat1: number, lat2: number, lon1: number, lon2: number) {
    const name = `${Date.now()}.png`
    const location = join('src', 'public', 'qr', name)
    qrCode.toFile(location, url)
    const data = {
      file: name,
      owner,
      lat1,
      lat2,
      lon1,
      lon2
    }
    const qr = await this.qrModel.create(data)
    return { ...qr.dataValues, location: location.toString().replace('src', '') }
  }
}
