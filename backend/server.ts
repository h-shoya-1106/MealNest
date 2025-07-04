import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from backend!');
});

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
