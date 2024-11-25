import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AssociateRolePermissionDto } from './dto/role-permission.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';

@ApiTags('Roles')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un nuevo rol' })
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Añadir un permiso al rol' })
  @Post('/add-permission')
  addPermission(@Body() addPermissionDto: AssociateRolePermissionDto) {
    return this.roleService.addPermission(addPermissionDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar todos los roles' })
  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener los permisos del rol' })
  @Get('/permissions/:id')
  getPermissions(@Param('id', ParseIntPipe) id: string) {
    return this.roleService.getPermissions(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Buscar un rol por ID' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.roleService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar un rol' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar un permiso del rol' })
  @Delete('/remove-permission')
  removePermission(@Body() removePermissionDto: AssociateRolePermissionDto) {
    return this.roleService.removePermission(removePermissionDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar un rol' })
  @Delete(':id')
  @ApiOkResponse({ description: 'Rol eliminado', type: CreateRoleDto })
  @ApiBadRequestResponse({ description: 'Error de parámetros' })
  @ApiNotFoundResponse({ description: 'Rol no encontrado' })
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.roleService.remove(+id);
  }
}
