import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'El servidor está funcionando correctamente';
  }
}
