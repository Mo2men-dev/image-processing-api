import supertest from 'supertest';
import app from '../../../../../index';

const request = supertest(app);

describe('testing response from /api/images', (): void => {
  it('should return a list of images and some instructions', async (): Promise<void> => {
    const response: supertest.Response = await request.get('/api/images');
    expect(response.status).toBe(200);
  });

  it('should return the requsted image with original width and height', async (): Promise<void> => {
    const response: supertest.Response = await request.get(
      '/api/images?f=encenadaport'
    );
    expect(response.status).toBe(200);
  });

  it('should return the resized image', async (): Promise<void> => {
    const response: supertest.Response = await request.get(
      '/api/images?f=encenadaport&w=200&h=200'
    );
    expect(response.status).toBe(200);
  });

  describe('testing invalid requests for /api/images', (): void => {
    it('should return an error message if the image does not exist', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api/images?f=idontexist&w=200&h=200'
      );
      expect(response.status).toBe(404);
    });

    it('should return an error massage if width is not provided', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api/images?f=encenadaport&h=200'
      );
      expect(response.status).toBe(400);
    });

    it('should return an error massage if height is not provide', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api/images?f=encenadaport&w=200'
      );
      expect(response.status).toBe(400);
    });

    it('should return an error message if the width is not a number', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api/images?f=encenadaport&w=abc&h=200'
      );
      expect(response.status).toBe(400);
    });

    it('should return an error message if the height is not a number', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api/images?f=encenadaport&w=200&h=abc'
      );
      expect(response.status).toBe(400);
    });

    it('should return an error message if the width and height are not numbers', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api/images?f=encenadaport&w=abc&h=abc'
      );
      expect(response.status).toBe(400);
    });

    it('should return an error message if the width is less than 1', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api/images?f=encenadaport&w=0&h=200'
      );
      expect(response.status).toBe(400);
    });

    it('should return an error message if the height is less than 1', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api/images?f=encenadaport&w=200&h=0'
      );
      expect(response.status).toBe(400);
    });

    it('should return an error message if the width is greater than 2000', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api/images?f=encenadaport&w=2001&h=200'
      );
      expect(response.status).toBe(400);
    });

    it('should return an error message if the height is greater than 2000', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api/images?f=encenadaport&w=200&h=2001'
      );
      expect(response.status).toBe(400);
    });

    it('should return a massage of invalid width or height', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api/images?f=encenadaport&w=0&h=0'
      );
      expect(response.status).toBe(400);
    });
  });
});
