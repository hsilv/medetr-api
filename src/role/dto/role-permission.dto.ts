import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class AssociateRolePermissionDto {
  @ApiProperty({
    example: 1,
    description: 'ID del rol',
  })
  @IsNotEmpty({ message: 'El ID del rol es requerido' })
  @IsInt({ message: 'El ID del rol debe ser un número entero' })
  id_rol: number;

  @ApiProperty({
    example: 1,
    description: 'ID del permiso',
  })
  @IsNotEmpty({ message: 'El ID del permiso es requerido' })
  @IsInt({ message: 'El ID del permiso debe ser un número entero' })
  id_permiso: number;
}
