import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from './entities/role.entity';
import {
  Permission,
  RolePermissions,
} from 'src/permissions/entities/permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Roles, RolePermissions, Permission])],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
