import { Router } from 'express';
import images from './images/images';

const router = Router();

router.use('/images', images);

router.get('/', (_req, res) => {
  res.send('Go to <a href="/api/images">/api/images</a> to see how to use');
});

export default router;
