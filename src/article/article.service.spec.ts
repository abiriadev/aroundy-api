import { ArticleService } from './article.service';

describe('CatsController', () => {
  let articleService: ArticleService;

  beforeEach(() => {
    articleService = new ArticleService();
  });

  describe('article', () => {
    it('should be defined', async () => {
      expect(articleService).not.toBeUndefined();
    });
  });
});
