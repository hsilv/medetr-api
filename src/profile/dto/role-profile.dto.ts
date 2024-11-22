import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class AddRoleToProfileDto {
  @ApiProperty({
    example: 1,
    description: 'Identificador del perfil',
  })
  @IsNotEmpty({ message: 'El ID del perfil es requerido' })
  @IsInt({ message: 'El ID del perfil debe ser un número entero' })
  id_perfil: number;

  @ApiProperty({
    example: 1,
    description: 'Identificador del rol',
  })
  @IsNotEmpty({ message: 'El ID del rol es requerido' })
  @IsInt({ message: 'El ID del rol debe ser un número entero' })
  id_rol: number;
}
