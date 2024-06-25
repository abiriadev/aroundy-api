import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Tag } from '../tag/tag.entity';

export default class CreateTags implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const tagFactory = factoryManager.get(Tag);

    const tags = [{ name: 'New' }, { name: '이벤트' }, { name: '할인' }];

    for (const tagData of tags) {
      const tag = await tagFactory.make(tagData);
      await dataSource.getRepository(Tag).save(tag);
    }
  }
}
