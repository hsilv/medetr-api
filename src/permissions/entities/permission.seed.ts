import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Permission } from './permission.entity';

export default class PermissionSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(Permission);

    const permissions = [
      { nombre: 'ADMINISTRADOR', descripcion: 'Permiso de administrador' },
    ];

    for (const permission of permissions) {
      const existingPermission = await repository.findOneBy({
        nombre: permission.nombre,
      });
      if (!existingPermission) {
        await repository.save(permission);
      }
    }
  }
}
