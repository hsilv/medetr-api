import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateProfileDto {
  @ApiProperty({
    example: 'Administrador',
    description: 'Nombre del perfil',
  })
  @IsNotEmpty({ message: 'El nombre del perfil es requerido' })
  @MaxLength(100, { message: 'El nombre del perfil es demasiado largo' })
  @IsString({ message: 'El nombre del perfil debe ser texto' })
  nombre: string;

  @ApiProperty({
    example: 'Perfil para administradores, posee TODOS los permisos posibles',
    description: 'Descripción del perfil',
  })
  @IsNotEmpty({ message: 'La descripción del perfil es requerida' })
  @MaxLength(255, { message: 'La descripción del perfil es demasiado larga' })
  @IsString({ message: 'La descripción del perfil debe ser texto' })
  descripcion: string;
}
