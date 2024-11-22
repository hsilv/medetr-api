import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginDto, UnauthorizedDto } from './dto/login-dto';
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
  })
  @ApiUnauthorizedResponse({
    description: 'Inicio de sesión fallido',
    type: UnauthorizedDto,
  })
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }
}
