import { request, gql } from "graphql-request";

const endpoint = `https://services.dappio.xyz/graphql`;

const query = gql`
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
`;

const variables = {
  symbol: "ETH",
};

request<{
  TokenInfos: {
    timestamp: string;
    price: string;
    protocol: string;
    chainId: string;
    mint: string;
    name: string;
    decimals: string;
    symbol: string;
    logoURI: string;
  };
}>(endpoint, query, variables).then(({ TokenInfos }) => console.log(TokenInfos));
