import { NextFunction, Request, Response, Router } from 'express';
import { promises as fs } from 'fs';
import { resizeImage } from '../../../utils/imageProcessing';

const images = Router();

const checkImageAlreadyProcessed = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // get file name , width and height from request
  const fileName = req.query.f as string;
  const width = req.query.w as unknown as number;
  const height = req.query.h as unknown as number;

  // get file path and read the thumb directory to check if the image is already processed
  const filePath = `./src/assets/thumb/${fileName}-(${width}x${height}).jpg`;
  const thumbDir = await fs.readdir('./src/assets/thumb');
  const fileExists = thumbDir.includes(`${fileName}-(${width}x${height}).jpg`);
  // if the image is already processed, send the image
  if (fileExists) {
    const image = await fs.readFile(filePath);
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(image);
  }
  // if the image is not processed , process the image , add it to thumb directory and send it
  else {
    next();
  }
};

const processImage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // get the file name and the width and height from the query string
  const fileName = req.query.f as string;
  const width = parseInt(req.query.w as string);
  const height = parseInt(req.query.h as string);

  // read the full directory of images and check if the image exists
  const fullDir = await fs.readdir('./src/assets/full');
  const fileExists = fullDir.includes(`${fileName}.jpg`);

  const filePath = `./src/assets/thumb/${fileName}-(${width}x${height}).jpg`;

  if (req.query.f) {
    // check if image exists
    if (fileExists) {
      // check if the width and height are provided , are numbers and within the valid range
      if (
        req.query.w &&
        req.query.h &&
        !isNaN(width) &&
        !isNaN(height) &&
        width > 1 &&
        height > 1 &&
        width < 2000 &&
        height < 2000
      ) {
        const image = await resizeImage(fileName, width, height);
        await fs.writeFile(filePath, image);
        res.setHeader('Content-Type', 'image/jpeg');
        res.send(image);
      }
      // if no width or height are provided send the original image
      else if (!req.query.w && !req.query.h) {
        const fullPath = `./src/assets/full/${fileName}.jpg`;
        const image = await fs.readFile(fullPath);
        res.setHeader('Content-Type', 'image/jpeg');
        res.send(image);
      }
      // if width or height don't satisfy the requirements send an error
      else {
        res.status(400).send('Invalid Width or Height');
      }
    }
    // if image doesn't exist send 404
    else {
      res.status(404).send("Image doesn't exist");
    }
  }
  // if no "f" query is provided send a message with instructions
  else {
    next();
  }
};

images.get(
  '/',
  checkImageAlreadyProcessed,
  processImage,
  async (req, res): Promise<void> => {
    const fileNames = await fs.readdir('./src/assets/full');
    // remove the extension from the file names
    const fileNamesWithoutExtension = fileNames.map(
      (fileName: string): string => ` ${fileName.slice(0, -4)}`
    );
    // instructions for user
    const message = `<h1><u>Hello ! Here is how to use this API :</u></h1><p>Add a <b>" f "</b> query with the image name to the URI to show the Image and Add <b>" w "</b> and <b>" h "</b> queries <u>Both</u> with the " f " query to resize the Image , Available Images: [ <b>${fileNamesWithoutExtension}</b> ]</p><p><b><u>Examples:</u></b></p><ul><li><b>${
      req.protocol + '://' + req.get('host') + req.originalUrl
    }?f=${fileNamesWithoutExtension[0].replace(
      ' ',
      ''
    )}&w=200&h=200</b></li><li><b>${
      req.protocol + '://' + req.get('host') + req.originalUrl
    }?f=${fileNamesWithoutExtension[1].replace(
      ' ',
      ''
    )}&w=200&h=200</b></li><li>Or you can add the " f " only to get the Image in it's original size like so : <b>${
      req.protocol + '://' + req.get('host') + req.originalUrl
    }?f=${fileNamesWithoutExtension[0].replace(' ', '')}</b></li></ul>`;

    res.status(200).send(message);
  }
);

export default images;
