import { Request, Response } from 'express';
import { Order } from './models/Order';

const express = require('express');
var cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.listen(port, () => console.log(`Listening on port ${port}`));

//Connect server and client
app.get('/', (req: Request, res: Response) => {
  res.json({ express: 'Your Express backend is connected to Client' });
});

//Get the order data
app.get('/data', (req: Request, res: Response) => {
  //Convert the csv data to jSON
  const csvFilePath = __dirname + '/data/data.csv';
  const csv = require('csvtojson');
  csv()
    .fromFile(csvFilePath)
    .then((jsonObj: Order) => {
      //Return order data in JSON format
      res.send(jsonObj);
    });
});
