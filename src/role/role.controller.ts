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
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AssociateRolePermissionDto } from './dto/role-permission.dto';

@ApiTags('Roles')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({ summary: 'Crear un nuevo rol' })
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @ApiOperation({ summary: 'Añadir un permiso al rol' })
  @Post('/add-permission')
  addPermission(@Body() addPermissionDto: AssociateRolePermissionDto) {
    return this.roleService.addPermission(addPermissionDto);
  }

  @ApiOperation({ summary: 'Listar todos los roles' })
  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @ApiOperation({ summary: 'Obtener los permisos del rol' })
  @Get('/permissions/:id')
  getPermissions(@Param('id', ParseIntPipe) id: string) {
    return this.roleService.getPermissions(+id);
  }

  @ApiOperation({ summary: 'Buscar un rol por ID' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.roleService.findOne(+id);
  }

  @ApiOperation({ summary: 'Actualizar un rol' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @ApiOperation({ summary: 'Eliminar un permiso del rol' })
  @Delete('/remove-permission')
  removePermission(@Body() removePermissionDto: AssociateRolePermissionDto) {
    return this.roleService.removePermission(removePermissionDto);
  }

  @ApiOperation({ summary: 'Eliminar un rol' })
  @Delete(':id')
  @ApiOkResponse({ description: 'Rol eliminado', type: CreateRoleDto })
  @ApiBadRequestResponse({ description: 'Error de parámetros' })
  @ApiNotFoundResponse({ description: 'Rol no encontrado' })
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.roleService.remove(+id);
  }
}
