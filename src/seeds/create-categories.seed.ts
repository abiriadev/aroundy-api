import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Category } from '../category/category.entity';

export default class CreateCategories implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const categoryRepository = dataSource.getRepository(Category);

    // Insert new category data
    await categoryRepository.insert([
      { name: '팝업스토어' },
      { name: '뷰티' },
      { name: '식품' },
      { name: '축제' },
      { name: '서비스' },
    ]);
  }
}
