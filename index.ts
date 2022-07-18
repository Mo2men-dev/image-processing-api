import express from 'express';
import router from './src/routes/api';
const app = express();
const port = process.env.PORT || 3000;

app.use('/api', router);

app.get('/', (_req, res) => {
  res.send(
    'This is main Route , Go to <a href="/api/images">/api/images</a> to see how to use'
  );
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
