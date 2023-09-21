import { Request, Response } from 'express';
import { Order } from './models/Order';

const express = require('express');
var cors = require('cors');
const app = express();
const port = 5000;

const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

app.use(cors());
app.listen(port, () => console.log(`Listening on port ${port}`));

// Construct a schema for currencies
var schema = buildSchema(`
  type Query {
    channel: [String]
  }
`);

var root = {
  channel: async () => {
    //Convert the csv data to jSON
    const csvFilePath = __dirname + '/data/data.csv';
    const csv = require('csvtojson');
    const data = await csv().fromFile(csvFilePath);

    const getChannels = data.map((channels: Order) => {
      return channels.channel;
    });
    return getChannels;
  },
};

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }),
);
