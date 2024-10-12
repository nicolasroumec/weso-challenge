import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { apiRouter } from './routes/apiRoutes.js';
import { connectToDatabase } from './dbConnection.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

connectToDatabase()
  .then(() => {
    app.use('/api', apiRouter);

    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send('Serve error');
    });

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(error => {
    console.error('DB connection error:', error);
    process.exit(1);
  });