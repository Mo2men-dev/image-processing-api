import supertest from 'supertest';
import app from '../../../../index';

const request = supertest(app);

describe('testing response from the main endpoint', (): void => {
  describe('testing /api', (): void => {
    it('should return 200 OK', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/api');
      expect(response.status).toBe(200);
    });
  });
});
