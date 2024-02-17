import { BadRequestException, Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common'
import { QrCodeService } from 'src/services/qr-code/qr-code.service'
import { Role, Roles } from 'src/services/role/roles.decorator'
import * as QrCode from 'qrcode'
import path from 'path'
import { AuthGuard } from 'src/services/auth/auth.guard'

@UseGuards(AuthGuard)
@Controller('qr')
export class QrCodeController {
  constructor(
    private qrService: QrCodeService
  ) { }

  @Roles(Role.admin)
  @Get('generate')
  async getQrCode(@Req() req: Request, @Query() query: any) {
    const owner = req['user'].id
    const { url, lat1, lat2, lon1, lon2 } = query
    const missingField = []
    if (!owner) missingField.push('owner')
    if (!url) missingField.push('url')
    if (!lat1) missingField.push('lat1')
    if (!lat2) missingField.push('lat2')
    if (!lon1) missingField.push('lon1')
    if (!lon2) missingField.push('lon2')
    if (missingField.length > 0) {
      throw new BadRequestException({
        message: 'missing field',
        statusCode: 400,
        missingField,
        data: []
      })
    }
    return this.qrService.generate(url, owner, lat1, lat2, lon1, lat2)
  }
}
