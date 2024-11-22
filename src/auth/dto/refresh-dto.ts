import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({
    description: 'Token de refresco',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjI0MSwiaWF0IjoxNzMyMj...',
  })
  @IsString({ message: 'El token de refresco debe ser texto' })
  @IsNotEmpty({ message: 'El token de refresco no debe estar vacío' })
  refresh_token: string;
}
