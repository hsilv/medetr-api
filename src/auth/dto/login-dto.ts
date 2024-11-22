import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'hm.sebastiansilva@gmail.com',
    description: 'Correo electrónico del usuario',
  })
  @IsString({ message: 'El correo electrónico del usuario debe ser texto' })
  @IsNotEmpty({
    message: 'El correo electrónico del usuario no debe estar vacío',
  })
  correo: string;

  @ApiProperty({
    example: 'Password123!',
    description: 'Contraseña del usuario',
  })
  @IsString({ message: 'La contraseña del usuario debe ser texto' })
  @IsNotEmpty({ message: 'La contraseña del usuario no debe estar vacía' })
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

export class SuccesfulLoginDto {
  @ApiProperty({
    example: 1,
    description: 'Identificador del usuario',
  })
  id: number;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjI0MSwiaWF0IjoxNzMyMj...',
    description: 'Token de acceso',
  })
  access_token: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjI0MSwiaWF0IjoxNzMyMj...',
    description: 'Token de refresco',
  })
  refresh_token: string;
}
