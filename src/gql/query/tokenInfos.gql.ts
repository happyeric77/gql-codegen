import { gql } from "graphql-request";

export const tokenInfoQuery = gql`
  query getTokenInfo($symbol: String!) {
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
