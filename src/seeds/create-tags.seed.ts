import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Tag } from '../tag/tag.entity';

export default class CreateTags implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const tagRepository = dataSource.getRepository(Tag);

    // Insert new tag data
    await tagRepository.insert([
      { name: 'New' },
      { name: '이벤트' },
      { name: '할인' },
    ]);
  }
}
