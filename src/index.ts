import express from 'express';
import path from 'path';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(path.resolve('src/public')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve('src/public/pages/report/index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
