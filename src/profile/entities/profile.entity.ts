import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('TB_PERFILES')
export class Profile {
  @PrimaryColumn({ type: 'int', generated: true })
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  nombre: string;

  @Column({ type: 'varchar', length: 255 })
  descripcion: string;
}
