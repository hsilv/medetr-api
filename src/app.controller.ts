import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Server')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    summary: 'Verifica si el servidor está funcionando correctamente',
  })
  @ApiOkResponse({
    description: 'El servidor está funcionando correctamente',
    type: String,
    example: 'El servidor está funcionando correctamente',
  })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
