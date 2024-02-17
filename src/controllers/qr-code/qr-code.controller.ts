import { BadRequestException, Body, Controller, Get, Param, Put, Query, Req, UseGuards } from '@nestjs/common'
import { QrCodeService } from 'src/services/qr-code/qr-code.service'
import { Role, Roles } from 'src/services/role/roles.decorator'
import * as QrCode from 'qrcode'
import path from 'path'
import { AuthGuard } from 'src/services/auth/auth.guard'
import { CusRequest } from 'src/interfaces/request.interface'
import { BadRequestRespone } from 'src/services/badRequest.respone'
import { requireValidate } from 'src/services/require.validate'

@UseGuards(AuthGuard)
@Roles(Role.admin)
@Controller('qr')
export class QrCodeController {
  constructor(
    private qrService: QrCodeService
  ) { }

  @Get('generate')
  @Get('generate')
  async generateQrCode(@Req() req: Request, @Query() query: any) {
    const owner = req['user'].id
    const { url, lat1, lat2, lon1, lon2 } = query
    requireValidate({ owner, url, lat1, lat2, lon1, lon2 })
    return this.qrService.generate(url, owner, lat1, lat2, lon1, lat2)
  }

  @Get()
  async getQrcode(@Req() req: CusRequest) {
    const owner = req.user.id
    return this.qrService.fetch(owner)
  }

  @Put('disable')
  disable(@Req() req: CusRequest, @Query() query: any, @Body() body: any) {
    const id = query.id
    const owner = req.user.id || body.id
    requireValidate({ id, owner })
    return this.qrService.disable(id, owner)
  }

  @Put('enable')
  enable(@Req() req: CusRequest, @Query() query: any, @Body() body: any) {
    const id = query.id
    const owner = req.user.id || body.id
    requireValidate({ id, owner })
    return this.qrService.enable(id, owner)
  }
}
