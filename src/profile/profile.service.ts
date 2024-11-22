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
import { AddRoleToProfileDto } from './dto/role-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(ProfileRoles)
    private profileRolesRepository: Repository<ProfileRoles>,
    @InjectRepository(Roles) private rolesRepository: Repository<Roles>,
  ) {}

  async create(createProfileDto: CreateProfileDto) {
    plainToClass(Profile, createProfileDto);
    const profile = await this.profileRepository.create(createProfileDto);
    return await this.profileRepository.save(profile);
  }

  async addRoleToProfile(addRoleToProfileDto: AddRoleToProfileDto) {
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
    }

    if (!profile) {
      throw new NotFoundException(['Perfil no encontrado']);
    }

    if (!role) {
      throw new NotFoundException(['Rol no encontrado']);
    }

    try {
      check = await this.profileRolesRepository.findOneBy({
        id_perfil: profile,
        id_rol: role,
      });
    } catch (error) {
      console.error(error);
    }

    if (check) {
      throw new BadRequestException(['Rol ya asignado al perfil']);
    }

    const profileRole = this.profileRolesRepository.create({
      id_perfil: profile,
      id_rol: role,
    });

    await this.profileRolesRepository.save(profileRole);
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
    }

    if (!finded) {
      throw new NotFoundException(['Perfil no encontrado']);
    }
    return finded;
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    let finded;
    try {
      finded = await this.profileRepository.findOneBy({ id });
    } catch (error) {
      console.error(error);
    }

    if (!finded) {
      throw new NotFoundException(['Perfil no encontrado']);
    }

    try {
      await this.profileRepository.update(id, updateProfileDto);
    } catch (error) {
      console.error(error);
    }

    return await this.profileRepository.findOneBy({ id });
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}