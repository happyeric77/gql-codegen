import { GraphQLClient } from "graphql-request";
import { getSdk } from "./generated";

const endpoint = `https://services.dappio.xyz/graphql`;

const client = new GraphQLClient(endpoint);

const sdk = getSdk(client);

const variables = {
  symbol: "ETH",
};

sdk.getTokenInfo(variables).then((data) => console.log(data));
