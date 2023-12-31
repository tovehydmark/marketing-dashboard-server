import { Order } from './models/Order';

const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

app.use(cors());
app.listen(port, () => console.log(`Listening on port ${port}`));

const convertDatasetToJson = async () => {
  //Convert the csv data to JSON
  const csvFilePath = __dirname + '/data/data.csv';
  const csv = require('csvtojson');
  const data = await csv().fromFile(csvFilePath);
  return data;
};

// Construct a schema for the data to be fetched
const schema = buildSchema(`
  type Query {
    channel: [String]
    channelGroup:[String]
    campaign:[String]
  }
`);

const root = {
  channel: async () => {
    const data = await convertDatasetToJson();

    const getChannels = data.map((channels: Order) => {
      return channels.channel;
    });

    return getChannels;
  },

  channelGroup: async () => {
    const data = await convertDatasetToJson();
    const getChannelgroups = data.map((channelGroups: Order) => {
      return channelGroups.channelGroup;
    });
    return getChannelgroups;
  },
  campaign: async () => {
    const data = await convertDatasetToJson();
    const getCampaigns = data.map((campaign: Order) => {
      return campaign.campaign;
    });
    return getCampaigns;
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
