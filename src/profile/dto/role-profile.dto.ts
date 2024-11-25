import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
import { CreatedProfileDto } from './response-profile.dto';
import { RoleResponseDto } from 'src/role/dto/response-role.dto';

export class AsociateRoleToProfileDto {
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

export class AddedRoleToProfileDto {
  @ApiProperty({
    example: 1,
    description: 'Identificador de la relación',
  })
  id: number;

  @ApiProperty({
    type: CreatedProfileDto,
    description: 'Perfil asociado',
  })
  perfil: CreatedProfileDto;

  @ApiProperty({
    description: 'Rol asociado',
    type: RoleResponseDto,
  })
  rol: RoleResponseDto;
}

export class NotFoundDto {
  @ApiProperty({
    example: ['Perfil no encontrado', 'Rol no encontrado', '...'],
    description: 'Mensaje de error',
  })
  message: string[];

  @ApiProperty({
    example: 'Not Found',
    description: 'Detalle del error',
  })
  error: string;

  @ApiProperty({
    example: 404,
    description: 'Código de error',
  })
  statusCode: number;
}
