import { Controller, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginDto, SuccesfulLoginDto, UnauthorizedDto } from './dto/login-dto';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';
import { RefreshTokenDto } from './dto/refresh-dto';

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
    return this.authService.login(req.user.id);
  }

  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  @ApiBody({
    type: RefreshTokenDto,
  })
  refreshToken(@Req() req) {
    return this.authService.refreshToken(req.user.id);
  }
}
