import { Profile } from 'src/profile/entities/profile.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('TB_ROL')
export class Roles {
  @PrimaryColumn({ type: 'int', generated: true })
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  nombre: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  descripcion: string;
}

@Entity('TB_PERFIL_ROL')
export class ProfileRoles {
  @PrimaryColumn({ type: 'int', generated: true })
  id: number;

  @ManyToOne(() => Profile, (profile) => profile.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'perfil' })
  perfil: Profile;

  @ManyToOne(() => Roles, (roles) => roles.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'rol' })
  rol: Roles;
}
