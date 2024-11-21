import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
  Matches,
  IsEmail,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'Herber Sebastián',
    description: 'Nombres del usuario',
  })
  @IsNotEmpty({ message: 'Los nombres del usuario son requeridos' })
  @IsString({ message: 'Los nombres del usuario deben ser texto' })
  @MaxLength(100, { message: 'Los nombres son demasiado largos' })
  nombres: string;

  @ApiProperty({
    example: 'Silva Muñoz',
    description: 'Apellidos del usuario',
  })
  @IsNotEmpty({ message: 'Los apellidos del usuario son requeridos' })
  @IsString({ message: 'Los apellidos del usuario deben ser texto' })
  @MaxLength(100, { message: 'Los apellidos son demasiado largos' })
  apellidos: string;

  @ApiProperty({
    example: '2002-03-20',
    description: 'Fecha de nacimiento del usuario',
  })
  @IsNotEmpty({ message: 'La fecha de nacimiento del usuario es requerida' })
  @IsDateString(
    {},
    { message: 'La fecha de nacimiento del usuario debe ser una fecha' },
  )
  fecha_nacimiento: Date;

  @ApiProperty({ example: '1234567890101', description: 'DPI del usuario' })
  @IsNotEmpty({ message: 'El DPI del usuario es requerido' })
  @IsString({ message: 'El DPI del usuario debe ser texto' })
  @Matches(/^[1-9][0-9]{12}$/, {
    message: 'El DPI del usuario debe ser numérico y no puede comenzar con 0',
  })
  @Length(13, 13, {
    message: 'El DPI del usuario debe tener 13 o 13 caracteres',
  })
  dpi: string;

  @ApiProperty({
    example: '123456789',
    description: 'Número de NIT del usuario',
  })
  @IsString({ message: 'El NIT del usuario debe ser texto' })
  @IsNotEmpty({ message: 'El NIT del usuario es requerido' })
  @Length(7, 9, {
    message: 'El NIT del usuario debe tener entre 7 y 9 caracteres',
  })
  nit: string;

  @ApiProperty({
    example: '12345678',
    description: 'Número de teléfono del usuario',
  })
  @IsString({ message: 'El teléfono del usuario debe ser texto' })
  @IsNotEmpty({ message: 'El teléfono del usuario es requerido' })
  @Matches(/^[1-9][0-9]{7}$/, {
    message:
      'El teléfono del usuario debe ser numérico y no puede comenzar con 0',
  })
  @Length(8, 8, {
    message: 'El teléfono del usuario debe tener 8 caracteres',
  })
  telefono: string;

  @ApiProperty({
    example: 'user@mail.com',
    description: 'Correo electrónico del usuario',
  })
  @IsString({ message: 'El correo electrónico del usuario debe ser texto' })
  @IsNotEmpty({ message: 'El correo electrónico del usuario es requerido' })
  @MaxLength(100, { message: 'El correo electrónico es demasiado largo' })
  @IsEmail({}, { message: 'El correo electrónico del usuario no es válido' })
  correo: string;

  @ApiProperty({
    example: 'Password123!',
    description: 'Contraseña del usuario',
  })
  @IsString({ message: 'La contraseña del usuario debe ser texto' })
  @IsNotEmpty({ message: 'La contraseña del usuario es requerida' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&ñáéíóú])[A-Za-z\d@$!%*?&ñáéíóú]{8,}$/,
    {
      message:
        'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y un caracter especial',
    },
  )
  clave: string;
}
