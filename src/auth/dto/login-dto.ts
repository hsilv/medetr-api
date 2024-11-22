import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'hm.sebastiansilva@gmail.com',
    description: 'Correo electrónico del usuario',
  })
  @IsString({ message: 'El correo electrónico del usuario debe ser texto' })
  correo: string;

  @ApiProperty({
    example: 'Password123!',
    description: 'Contraseña del usuario',
  })
  @IsString({ message: 'La contraseña del usuario debe ser texto' })
  clave: string;
}

export class UnauthorizedDto {
  @ApiProperty({
    example: ['Razones', '...'],
    description: 'Mensaje de error',
  })
  message: string[];

  @ApiProperty({
    description: 'Código de error',
    example: 401,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Nombre del error',
    example: 'Unauthorized',
  })
  error: string;
}
