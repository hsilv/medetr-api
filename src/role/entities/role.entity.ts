import { Profile } from 'src/profile/entities/profile.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Entity('TB_ROL')
export class Roles {
  @PrimaryColumn({ type: 'int', generated: true })
  id: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;
}

@Entity('TB_PERFIL_ROL')
export class ProfileRoles {
  @PrimaryColumn({ type: 'int', generated: true })
  id: number;

  @OneToOne(() => Profile, (profile) => profile.id, { cascade: true })
  @JoinColumn({ name: 'id_perfil' })
  id_perfil: Profile;

  @OneToOne(() => Roles, (roles) => roles.id, { cascade: true })
  @JoinColumn({ name: 'id_rol' })
  id_rol: Roles;
}
