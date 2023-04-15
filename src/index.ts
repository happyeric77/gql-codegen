import { request } from "graphql-request";
import { graphql } from "./gql";

const endpoint = `https://services.dappio.xyz/graphql`;

const query = graphql(/* GraphQL */ `
  query Task($symbol: String!) {
    TokenInfos(symbol: $symbol) {
      timestamp
      price
      protocol
      chainId
      mint
      name
      decimals
      symbol
      logoURI
    }
  }
`);

const variables = {
  symbol: "ETH",
};

request(endpoint, query, variables).then(({ TokenInfos }) => console.log(TokenInfos));
