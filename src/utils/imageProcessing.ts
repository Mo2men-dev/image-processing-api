import sharp from 'sharp';

export const resizeImage = async (
  fileName: string,
  width: number,
  height: number
): Promise<Buffer> => {
  const filePath = `./src/assets/full/${fileName}.jpg`;
  const processedImage = sharp(filePath).resize(width, height);
  return processedImage.toBuffer();
};
