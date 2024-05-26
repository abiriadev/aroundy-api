import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Category } from '../category/category.entity';

export default class CreateCategories implements Seeder {
  public async run(
    dataSource: DataSource, // eslint-disable-line
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const categoryRepository = dataSource.getRepository(Category);

    await categoryRepository.clear();

    await categoryRepository.insert([
      { name: '팝업스토어' },
      { name: '뷰티' },
      { name: '식품' },
      { name: '축제' },
      { name: '서비스' },
    ]);
  }
}
