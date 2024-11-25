import { ApiProperty } from '@nestjs/swagger';
import { CreateRoleDto } from './create-role.dto';

export class RoleResponseDto extends CreateRoleDto {
  @ApiProperty({
    description: 'Identificador del rol',
    example: 1,
  })
  id: number;
}
