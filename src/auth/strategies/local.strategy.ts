import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'correo',
      passwordField: 'clave',
    });
  }

  validate(correo: string, clave: string) {
    return this.authService.validateUser(correo, clave);
  }
}
