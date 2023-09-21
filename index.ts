import { Request, Response } from 'express';

const express = require('express');
var cors = require('cors');
const app = express();
app.use(cors());
const port = 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/', (req: Request, res: Response) => {
  res.json({ express: 'Your Express backend is connected to Client' });
});
