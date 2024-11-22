import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { UserService } from 'src/user/user.service';
import { AuthJwtPayload } from './types/auth-jwtPayload';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    let user;
    try {
      user = await this.userService.findOneByEmail(email);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new UnauthorizedException(['Usuario no encontrado']);
      } else {
        throw error;
      }
    }

    const isPasswordMatch = await compare(password, user.clave);
    if (!isPasswordMatch)
      throw new UnauthorizedException(['Credenciales inválidas']);

    return { id: user.id };
  }

  login(userId: number) {
    const payload: AuthJwtPayload = { sub: userId };
    return this.jwtService.sign(payload);
  }
}
