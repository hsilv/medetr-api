import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { ProfileRoles } from 'src/role/entities/role.entity';
import { RolePermissions } from 'src/permissions/entities/permission.entity';
import { CreatedUserDto } from './dto/response-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private repository: Repository<User>,
    @InjectRepository(ProfileRoles)
    private profileRolesRepository: Repository<ProfileRoles>,
    @InjectRepository(RolePermissions)
    private rolePermissionsRepository: Repository<RolePermissions>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    plainToClass(User, createUserDto);
    const user = this.repository.create(createUserDto);

    // Validar que el DPI y el correo no estén registrados
    let checkDpi;
    let checkCorreo;
    try {
      checkDpi = await this.repository.findOneBy({
        dpi: createUserDto.dpi,
      });
      checkCorreo = await this.repository.findOneBy({
        correo: createUserDto.correo,
      });
    } catch (error) {
      console.error(error);
    }
    if (checkDpi) {
      throw new BadRequestException(['El DPI ya está registrado']);
    }
    if (checkCorreo) {
      throw new BadRequestException(['El correo ya está registrado']);
    }

    try {
      const saved = await this.repository.save(user);
      return saved;
    } catch (error) {
      console.error(error);
    }
  }

  async findAll(): Promise<User[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<CreatedUserDto> {
    let user: User;
    try {
      user = await this.repository.findOne({
        where: { id },
        relations: {
          perfil_usuario: true,
        },
      });
    } catch (error) {
      console.error(error);
    }
    if (!user) {
      throw new NotFoundException(['Usuario no encontrado']);
    }

    if (user.perfil_usuario) {
      const rolesRes = await this.profileRolesRepository.find({
        where: { perfil: user.perfil_usuario },
        relations: {
          rol: true,
        },
      });
      const roles = rolesRes.map((role) => role.rol);

      if (roles) {
        const permissionsRes = await this.rolePermissionsRepository.find({
          where: { rol: roles },
          relations: {
            permiso: true,
          },
        });
        const permissions = permissionsRes.map(
          (permission) => permission.permiso.nombre,
        );
        return { ...user, permisos: permissions };
      } else {
        return user;
      }
    } else {
      return user;
    }
  }

  async findOneByEmail(correo: string): Promise<User> {
    let one: User;
    try {
      one = await this.repository.findOneBy({ correo });
    } catch (error) {
      console.error(error);
    }

    if (!one) {
      throw new NotFoundException(['Usuario no encontrado']);
    }

    return one;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    plainToClass(User, updateUserDto);
    const user = this.repository.create(updateUserDto);

    let check;
    try {
      check = await this.repository.findOneBy({ id });
    } catch (error) {
      console.error(error);
    }

    if (!check) {
      throw new NotFoundException(['Usuario no encontrado']);
    }

    try {
      await this.repository.update(id, user);
      return await this.repository.findOneBy({ id });
    } catch (error) {
      console.error(error);
    }
  }

  async remove(id: number) {
    const deleteInfo = await this.repository.delete(id);
    if (deleteInfo.affected === 0) {
      throw new NotFoundException(['Usuario no encontrado']);
    } else {
      return { id };
    }
  }
}
