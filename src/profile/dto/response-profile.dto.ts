import { ApiProperty } from '@nestjs/swagger';

export class CreatedProfileDto {
  @ApiProperty({
    example: 1,
    description: 'Identificador del perfil',
  })
  id: number;

  @ApiProperty({
    example: 'Administrador',
    description: 'Nombre del perfil',
  })
  nombre: string;

  @ApiProperty({
    example: 'Perfil de administrador',
    description: 'Descripción del perfil',
  })
  descripcion: string;
}

export class BadRequestDto {
  @ApiProperty({
    example: ['Error al crear el perfil', '...'],
    description: 'Mensaje de error',
  })
  message: string[];

  @ApiProperty({
    example: 'BadRequestException',
    description: 'Tipo de error',
  })
  error: string;

  @ApiProperty({
    example: 400,
    description: 'Código de estado HTTP',
  })
  statusCode: number;
}
