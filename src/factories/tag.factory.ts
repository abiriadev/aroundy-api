import { setSeederFactory } from 'typeorm-extension';
import { Tag } from '../tag/tag.entity';

export default setSeederFactory(Tag, () => {
  const tag = new Tag();
  tag.name = '';
  tag.created_at = new Date();
  tag.updated_at = new Date();
  tag.deleted_at = null;
  return tag;
});
