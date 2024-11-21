import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class CreatedUserDto extends CreateUserDto {
  @ApiProperty({
    example: 'https://www.example.com/image.jpg',
    description: 'URL de la imagen de perfil del usuario',
  })
  @ApiPropertyOptional()
  foto: string;

  @ApiProperty({
    example: 1,
    description: 'ID del usuario',
  })
  id: number;

  @ApiProperty({
    example: 0,
    description: 'Estado de verificación del usuario',
  })
  verificado: number;
}

export class ErrorUserDto {
  @ApiProperty({
    example: [
      'El DPI ya está registrado',
      'El correo ya está registrado',
      '...',
    ],
    description: 'Arreglo de errores',
  })
  message: string[];

  @ApiProperty({
    example: 400,
    description: 'Código de error',
  })
  statusCode: number;

  @ApiProperty({
    example: 'Bad Request o Not Found, etc.',
    description: 'Estado del error',
  })
  error: string;
}

export class DeletedUserDto {
  @ApiProperty({
    example: 1,
    description: 'ID del usuario eliminado',
  })
  id: number;
}
