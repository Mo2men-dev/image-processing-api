import { resizeImage } from '../../utils/imageProcessing';

describe('testing image processing', () => {
  it('should return a resized image', () => {
    const image = resizeImage('fjord', 200, 200);
    expect(image).toBeDefined();
  });
});
