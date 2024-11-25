import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  AddedRoleToProfileDto,
  AsociateRoleToProfileDto,
  NotFoundDto,
} from './dto/role-profile.dto';
import { BadRequestDto, CreatedProfileDto } from './dto/response-profile.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { ErrorUserDto } from 'src/user/dto/response-user.dto';
import { RoleResponseDto } from 'src/role/dto/response-role.dto';

@ApiTags('Perfiles')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un nuevo perfil' })
  @ApiCreatedResponse({
    description: 'Perfil creado exitosamente',
    type: CreatedProfileDto,
  })
  @ApiBadRequestResponse({
    description: 'Error al crear el perfil',
    type: BadRequestDto,
  })
  @Post()
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profileService.create(createProfileDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Agregar un rol a un perfil' })
  @ApiCreatedResponse({
    description: 'Rol agregado exitosamente',
    type: AddedRoleToProfileDto,
  })
  @ApiNotFoundResponse({
    description: 'Perfil o rol no encontrado',
    type: NotFoundDto,
  })
  @ApiBadRequestResponse({
    description: 'Parámetros no válidos',
    type: ErrorUserDto,
  })
  @Post('add-role')
  addRoleToProfile(@Body() addRoleToProfileDto: AsociateRoleToProfileDto) {
    return this.profileService.addRoleToProfile(addRoleToProfileDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener todos los perfiles' })
  @ApiOkResponse({
    description: 'Perfiles encontrados',
    type: [CreatedProfileDto],
  })
  @Get()
  findAll() {
    return this.profileService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('roles/:id')
  @ApiOperation({ summary: 'Obtener los roles de un perfil' })
  @ApiOkResponse({
    description: 'Roles encontrados',
    type: [RoleResponseDto],
  })
  @ApiNotFoundResponse({
    description: 'Perfil no encontrado',
    type: NotFoundDto,
  })
  @ApiBadRequestResponse({
    description: 'Parámetros no válidos',
    type: ErrorUserDto,
  })
  findRolesByProfile(@Param('id', ParseIntPipe) id: string) {
    return this.profileService.findRolesByProfileId(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener un perfil por su ID' })
  @ApiOkResponse({
    description: 'Perfil encontrado',
    type: CreatedProfileDto,
  })
  @ApiBadRequestResponse({
    description: 'Parámetros no válidos',
    type: ErrorUserDto,
  })
  @ApiNotFoundResponse({
    description: 'Perfil no encontrado',
    type: NotFoundDto,
  })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.profileService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar un perfil' })
  @ApiOkResponse({
    description: 'Perfil actualizado exitosamente',
    type: CreatedProfileDto,
  })
  @ApiBadRequestResponse({
    description: 'Error al actualizar el perfil',
    type: BadRequestDto,
  })
  @ApiNotFoundResponse({
    description: 'Perfil no encontrado',
    type: NotFoundDto,
  })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.profileService.update(+id, updateProfileDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar un rol de un perfil' })
  @ApiOkResponse({
    description: 'Rol eliminado exitosamente',
    type: AsociateRoleToProfileDto,
  })
  @ApiBadRequestResponse({
    description: 'Parámetros no válidos',
    type: ErrorUserDto,
  })
  @ApiNotFoundResponse({
    description: 'Perfil o rol no encontrado',
    type: NotFoundDto,
  })
  @Delete('remove-role')
  removeRoleFromProfile(
    @Body() removeRoleFromProfileDto: AsociateRoleToProfileDto,
  ) {
    return this.profileService.removeRoleFromProfile(removeRoleFromProfileDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar un perfil' })
  @Delete(':id')
  @ApiBadRequestResponse({
    description: 'Parámetros no válidos',
    type: ErrorUserDto,
  })
  @ApiNotFoundResponse({
    description: 'Perfil no encontrado',
    type: NotFoundDto,
  })
  @ApiOkResponse({
    description: 'Perfil eliminado exitosamente',
    type: CreateProfileDto,
  })
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.profileService.remove(+id);
  }
}
