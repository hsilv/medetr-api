import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { ProfileRoles, Roles } from 'src/role/entities/role.entity';
import { AsociateRoleToProfileDto } from './dto/role-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(ProfileRoles)
    private profileRolesRepository: Repository<ProfileRoles>,
    @InjectRepository(Roles) private rolesRepository: Repository<Roles>,
  ) {}

  async create(createProfileDto: CreateProfileDto) {
    let check;
    try {
      check = await this.profileRepository.findOneBy({
        nombre: createProfileDto.nombre,
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
    if (check)
      throw new BadRequestException(['Ya existe un perfil con ese nombre']);
    plainToClass(Profile, createProfileDto);
    const profile = await this.profileRepository.create(createProfileDto);
    return await this.profileRepository.save(profile);
  }

  async addRoleToProfile(addRoleToProfileDto: AsociateRoleToProfileDto) {
    let profile;
    let role;
    let check;
    try {
      profile = await this.profileRepository.findOneBy({
        id: addRoleToProfileDto.id_perfil,
      });
      role = await this.rolesRepository.findOneBy({
        id: addRoleToProfileDto.id_rol,
      });
    } catch (error) {
      console.error(error);
      throw error;
    }

    if (!profile) {
      throw new NotFoundException(['Perfil no encontrado']);
    }

    if (!role) {
      throw new NotFoundException(['Rol no encontrado']);
    }

    try {
      check = await this.profileRolesRepository.findOneBy({
        perfil: profile,
        rol: role,
      });
    } catch (error) {
      console.error(error);
      throw error;
    }

    if (check) {
      throw new BadRequestException(['Rol ya asignado al perfil']);
    }

    const profileRole = this.profileRolesRepository.create({
      perfil: profile,
      rol: role,
    });

    return await this.profileRolesRepository.save(profileRole);
  }

  async removeRoleFromProfile(
    removeRoleFromProfileDto: AsociateRoleToProfileDto,
  ) {
    let profile;
    let role;
    let check;
    try {
      profile = await this.profileRepository.findOneBy({
        id: removeRoleFromProfileDto.id_perfil,
      });
      role = await this.rolesRepository.findOneBy({
        id: removeRoleFromProfileDto.id_rol,
      });
    } catch (error) {
      console.error(error);
      throw error;
    }

    if (!profile) {
      throw new NotFoundException(['Perfil no encontrado']);
    }

    if (!role) {
      throw new NotFoundException(['Rol no encontrado']);
    }

    try {
      check = await this.profileRolesRepository.findOneBy({
        perfil: profile,
        rol: role,
      });
    } catch (error) {
      console.error(error);
      throw error;
    }

    if (!check) {
      throw new BadRequestException(['Rol no asignado al perfil']);
    }

    await this.profileRolesRepository.remove(check);

    return removeRoleFromProfileDto;
  }

  async findAll() {
    return await this.profileRepository.find();
  }

  async findOne(id: number) {
    let finded;
    try {
      finded = await this.profileRepository.findOneBy({ id });
    } catch (error) {
      console.error(error);
      throw error;
    }

    if (!finded) {
      throw new NotFoundException(['Perfil no encontrado']);
    }
    return finded;
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    let finded;
    let violatedConstraint;
    try {
      finded = await this.profileRepository.findOneBy({ id });
    } catch (error) {
      console.error(error);
      throw error;
    }

    if (!finded) {
      throw new NotFoundException(['Perfil no encontrado']);
    }

    try {
      violatedConstraint = await this.profileRepository.findOneBy({
        nombre: updateProfileDto.nombre,
      });
    } catch (error) {
      console.error(error);
      throw error;
    }

    if (violatedConstraint) {
      throw new BadRequestException(['Ya existe un perfil con ese nombre']);
    }

    try {
      await this.profileRepository.update(id, updateProfileDto);
    } catch (error) {
      console.error(error);
      throw error;
    }

    return await this.profileRepository.findOneBy({ id });
  }

  async remove(id: number) {
    let check;
    try {
      check = await this.profileRepository.findOneBy({ id });
    } catch (error) {
      console.error(error);
      throw error;
    }

    if (!check) {
      throw new NotFoundException(['Perfil no encontrado']);
    }

    return await this.profileRepository.remove(check);
  }

  async findRolesByProfileId(id: number) {
    let profile;
    try {
      profile = await this.profileRepository.findOneBy({ id });
    } catch (error) {
      console.error(error);
      throw error;
    }
    if (!profile) {
      throw new NotFoundException(['Perfil no encontrado']);
    }

    const res = await this.profileRolesRepository.find({
      where: { perfil: profile },
      relations: {
        rol: true,
        perfil: true,
      },
    });
    const roles = res.map((r) => r.rol);
    return roles;
  }
}
