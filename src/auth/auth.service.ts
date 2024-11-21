import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);
    if (!user) throw new UnauthorizedException(['Usuario no encontrado']);

    const isPasswordMatch = await compare(password, user.clave);
    if (!isPasswordMatch)
      throw new UnauthorizedException(['Credenciales inválidas']);

    return { id: user.id };
  }
}
