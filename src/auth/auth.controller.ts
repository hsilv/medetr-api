import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginDto, SuccesfulLoginDto, UnauthorizedDto } from './dto/login-dto';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Inicio de sesión' })
  @UseGuards(LocalAuthGuard)
  @ApiBody({
    type: LoginDto,
  })
  @ApiCreatedResponse({
    description: 'Inicio de sesión exitoso',
    type: SuccesfulLoginDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Inicio de sesión fallido',
    type: UnauthorizedDto,
  })
  @Post('login')
  async login(@Request() req) {
    const token = this.authService.login(req.user.id);
    return { id: req.user.id, access_token: token };
  }
}
