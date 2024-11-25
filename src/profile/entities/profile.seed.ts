import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Profile } from './profile.entity';

export default class ProfileSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(Profile);

    const profiles = [
      { nombre: 'ADMINISTRADOR', descripcion: 'Perfil de administrador' },
    ];

    for (const profile of profiles) {
      const existingProfile = await repository.findOneBy({
        nombre: profile.nombre,
      });
      if (!existingProfile) {
        await repository.save(profile);
      }
    }
  }
}
