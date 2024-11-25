import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  async verifyNamesConstraint(name: string) {
    let check;
    try {
      check = await this.permissionRepository.findOneBy({ nombre: name });
    } catch (error) {
      console.error(error);
      throw error;
    }
    if (check) {
      throw new BadRequestException(['Ya existe un permiso con ese nombre']);
    }
  }

  async verifyIfPermissionExists(id: number) {
    let check;
    try {
      check = await this.permissionRepository.findOneBy({ id });
    } catch (error) {
      console.error(error);
      throw error;
    }
    if (!check) {
      throw new BadRequestException(['Permiso no encontrado']);
    }
    return check;
  }

  async create(createPermissionDto: CreatePermissionDto) {
    plainToClass(Permission, createPermissionDto);
    await this.verifyNamesConstraint(createPermissionDto.nombre);
    const permission =
      await this.permissionRepository.create(createPermissionDto);
    return await this.permissionRepository.save(permission);
  }

  async findAll() {
    return await this.permissionRepository.find();
  }

  async findOne(id: number) {
    return await this.verifyIfPermissionExists(id);
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto) {
    await this.verifyIfPermissionExists(id);
    if (updatePermissionDto.nombre)
      await this.verifyNamesConstraint(updatePermissionDto.nombre);
    await this.permissionRepository.update(id, updatePermissionDto);
    return await this.permissionRepository.findOneBy({ id });
  }

  async remove(id: number) {
    const check = await this.verifyIfPermissionExists(id);
    return await this.permissionRepository.remove(check);
  }
}
