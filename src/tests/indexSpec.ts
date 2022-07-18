import supertest from 'supertest';
import app from '../../index';

const request = supertest(app);

describe('testing response from the main endpoint', (): void => {
  describe('testing /', (): void => {
    it('should return 200 OK', async (): Promise<void> => {
      const response = await request.get('/');
      expect(response.status).toBe(200);
    });
  });
});
