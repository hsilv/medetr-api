import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Roles } from './role.entity';

export default class roleSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(Roles);

    const roles = [
      { nombre: 'ADMINISTRADOR', descripcion: 'Rol de administrador' },
    ];

    for (const role of roles) {
      const existingrole = await repository.findOneBy({
        nombre: role.nombre,
      });
      if (!existingrole) {
        await repository.save(role);
      }
    }
  }
}
