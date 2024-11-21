import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity()
export class User {
  @PrimaryColumn({ type: 'int', generated: true })
  id: number;

  @Column({ type: 'varchar', length: 100 })
  nombres: string;

  @Column({ type: 'varchar', length: 100 })
  apellidos: string;

  @Column({ type: 'date' })
  fecha_nacimiento: Date;

  @Column({ type: 'varchar', length: 20, unique: true })
  dpi: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  foto: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  nit: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  telefono: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  correo: string;

  @Column({ type: 'varchar' })
  clave: string;

  @Column({ type: 'number', default: 0 })
  verificado: number;

  @BeforeInsert()
  async hashPassword() {
    this.clave = await bcrypt.hash(this.clave, 10);
  }

  @BeforeUpdate()
  async hashPasswordUpdate() {
    if (this.clave) {
      this.clave = await bcrypt.hash(this.clave, 10);
    }
  }
}
