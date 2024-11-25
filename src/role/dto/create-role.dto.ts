import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    example: 'Administrador de Base de Datos',
    description: 'Nombre del rol',
  })
  @IsNotEmpty({ message: 'El nombre del rol es requerido' })
  @MaxLength(100, { message: 'El nombre del rol es demasiado largo' })
  @IsString({ message: 'El nombre del rol debe ser texto' })
  nombre: string;

  @ApiProperty({
    example: 'Rol con acceso total a la base de datos',
    description: 'Descripción del rol',
  })
  @IsNotEmpty({ message: 'La descripción del rol es requerida' })
  @MaxLength(255, { message: 'La descripción del rol es demasiado larga' })
  @IsString({ message: 'La descripción del rol debe ser texto' })
  descripcion: string;
}
