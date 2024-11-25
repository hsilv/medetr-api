import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from './entities/role.entity';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import {
  Permission,
  RolePermissions,
} from 'src/permissions/entities/permission.entity';
import { AssociateRolePermissionDto } from './dto/role-permission.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Roles) private roleRepository: Repository<Roles>,
    @InjectRepository(RolePermissions)
    private rolePermissionsRepository: Repository<RolePermissions>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  async checkIfPermissionExists(id: number): Promise<Permission> {
    let check;
    try {
      check = await this.permissionRepository.findOneBy({ id });
    } catch (error) {
      console.error(error);
      throw error;
    }
    if (!check) {
      throw new NotFoundException(['Permiso no encontrado']);
    }
    return check;
  }

  async checkIfRelationExists(permission: Permission, role: Roles) {
    let check;
    try {
      check = await this.rolePermissionsRepository.findOneBy({
        permiso: permission,
        rol: role,
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
    return check;
  }

  async addPermission(addPermissionDto: AssociateRolePermissionDto) {
    const permission = await this.checkIfPermissionExists(
      addPermissionDto.id_permiso,
    );

    const role = await this.verifyIfRoleExists(addPermissionDto.id_rol);

    const check = await this.checkIfRelationExists(permission, role);

    if (check) {
      throw new BadRequestException(['Permiso ya asignado a rol']);
    }

    const relation = await this.rolePermissionsRepository.create({
      permiso: permission,
      rol: role,
    });

    return await this.rolePermissionsRepository.save(relation);
  }

  async removePermission(removePermissionDto: AssociateRolePermissionDto) {
    const permission = await this.checkIfPermissionExists(
      removePermissionDto.id_permiso,
    );

    const role = await this.verifyIfRoleExists(removePermissionDto.id_rol);

    const check = await this.checkIfRelationExists(permission, role);

    if (!check) {
      throw new BadRequestException(['Permiso no asignado a rol']);
    }

    await this.rolePermissionsRepository.remove(check);
    return removePermissionDto;
  }

  async getPermissions(id: number) {
    const check = await this.verifyIfRoleExists(id);
    const res = await this.rolePermissionsRepository.find({
      where: {
        rol: check,
      },
      relations: {
        permiso: true,
        rol: true,
      },
    });
    const roles = res.map((role) => role.permiso);
    return roles;
  }

  async verifyNamesConstraint(name: string) {
    let check;
    try {
      check = await this.roleRepository.findOneBy({ nombre: name });
    } catch (error) {
      console.error(error);
      throw error;
    }
    if (check) {
      throw new BadRequestException(['Ya existe un rol con ese nombre']);
    }
  }

  async verifyIfRoleExists(id: number): Promise<Roles> {
    let check;
    try {
      check = await this.roleRepository.findOneBy({ id });
    } catch (error) {
      console.error(error);
      throw error;
    }
    if (!check) {
      throw new NotFoundException(['Rol no encontrado']);
    }
    return check;
  }

  async create(createRoleDto: CreateRoleDto) {
    plainToClass(Roles, createRoleDto);
    await this.verifyNamesConstraint(createRoleDto.nombre);
    const role = await this.roleRepository.create(createRoleDto);
    return await this.roleRepository.save(role);
  }

  async findAll() {
    return await this.roleRepository.find();
  }

  async findOne(id: number) {
    return await this.verifyIfRoleExists(id);
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    plainToClass(Roles, updateRoleDto);
    await this.verifyIfRoleExists(id);
    if (updateRoleDto.nombre)
      await this.verifyNamesConstraint(updateRoleDto.nombre);
    await this.roleRepository.update(id, updateRoleDto);
    return await this.roleRepository.findOneBy({ id });
  }

  async remove(id: number) {
    const check = await this.verifyIfRoleExists(id);
    return await this.roleRepository.remove(check);
  }
}
