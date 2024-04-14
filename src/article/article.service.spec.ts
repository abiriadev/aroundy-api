import { ArticleService } from './article.service';

describe('articleService', () => {
  let articleService: ArticleService;

  beforeEach(() => {
    articleService = new ArticleService();
  });

  it('should be defined', async () => {
    expect(articleService).not.toBeUndefined();
  });
});
