import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreatePermissionDto {
  @ApiProperty({
    example: 'LECTURA_PERFIL',
    description: 'Nombre del permiso',
  })
  @IsNotEmpty({ message: 'Debe ingresar un nombre' })
  @IsString({ message: 'El nombre debe ser un string' })
  @MaxLength(100, { message: 'El nombre no puede superar los 100 caracteres' })
  nombre: string;

  @ApiProperty({
    example: 'Permiso para leer la información de un perfil',
    description: 'Descripción del permiso',
  })
  @IsNotEmpty({ message: 'Debe ingresar una descripción' })
  @IsString({ message: 'La descripción debe ser un string' })
  @MaxLength(255, {
    message: 'La descripción no puede superar los 255 caracteres',
  })
  descripcion: string;
}
