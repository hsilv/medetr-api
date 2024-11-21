import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  ErrorUserDto,
  CreatedUserDto,
  DeletedUserDto,
} from './dto/response-user.dto';

@ApiTags('Usuarios')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Crear un usuario / Registrarse' })
  @ApiBadRequestResponse({
    description: 'Error de validación',
    type: ErrorUserDto,
  })
  @ApiCreatedResponse({
    description: 'Usuario creado',
    type: CreatedUserDto,
  })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los usuarios' })
  @ApiOkResponse({
    description: 'Lista de usuarios',
    type: [CreatedUserDto],
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  @ApiOkResponse({
    description: 'Usuario encontrado',
    type: CreatedUserDto,
  })
  @ApiNotFoundResponse({
    description: 'Usuario no encontrado',
    type: ErrorUserDto,
  })
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un usuario por ID' })
  @ApiOkResponse({
    description: 'Usuario actualizado',
    type: CreatedUserDto,
  })
  @ApiNotFoundResponse({
    description: 'Usuario no encontrado',
    type: ErrorUserDto,
  })
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: 'Eliminar un usuario por ID' })
  @ApiOkResponse({
    description: 'Usuario eliminado',
    type: DeletedUserDto,
  })
  @ApiNotFoundResponse({
    description: 'Usuario no encontrado',
    type: ErrorUserDto,
  })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.userService.remove(+id);
  }
}
