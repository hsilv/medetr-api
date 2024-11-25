import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { oracleConfig } from 'ormconfig';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { RoleModule } from './role/role.module';
import { PermissionsModule } from './permissions/permissions.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...oracleConfig,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    AuthModule,
    UserModule,
    ProfileModule,
    RoleModule,
    PermissionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
