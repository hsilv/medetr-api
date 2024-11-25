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
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Permisos')
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @ApiOperation({ summary: 'Crear un nuevo permiso' })
  @Post()
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.create(createPermissionDto);
  }

  @ApiOperation({ summary: 'Listar todos los permisos' })
  @Get()
  findAll() {
    return this.permissionsService.findAll();
  }

  @ApiOperation({ summary: 'Buscar un permiso por ID' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.permissionsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Actualizar un permiso' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    return this.permissionsService.update(+id, updatePermissionDto);
  }

  @ApiOperation({ summary: 'Eliminar un permiso' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.permissionsService.remove(+id);
  }
}
