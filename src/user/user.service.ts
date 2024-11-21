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

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

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

  async findOne(id: number): Promise<User> {
    let user;
    try {
      user = await this.repository.findOneBy({ id });
    } catch (error) {
      console.error(error);
    }
    if (!user) {
      throw new NotFoundException(['Usuario no encontrado']);
    }
    return user;
  }

  async findOneByEmail(correo: string): Promise<User> {
    let one;
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
