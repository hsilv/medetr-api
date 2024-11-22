import { Roles } from 'src/role/entities/role.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Entity('TB_PERMISOS')
export class Permission {
  @PrimaryColumn({ type: 'int', generated: true })
  id: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'varchar', length: 255 })
  descripcion: string;
}

@Entity('TB_ROL_PERMISO')
export class RolePermissions {
  @PrimaryColumn({ type: 'int', generated: true })
  id: number;

  @OneToOne(() => Roles, (roles) => roles.id, { cascade: true })
  @JoinColumn({ name: 'id_rol' })
  id_rol: Roles;

  @OneToOne(() => Permission, (permission) => permission.id, { cascade: true })
  @JoinColumn({ name: 'id_permiso' })
  id_permiso: Permission;
}