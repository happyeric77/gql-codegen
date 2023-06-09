# Get started with type free graphQL with graphql-codegen

In this article we will learn how to use [graphql-codegen](https://graphql-code-generator.com/) to generate types for our graphQL queries.

We will use the following dappio endpoint which is able to get major protocol data from Solana blockchain.

```
https://services.dappio.xyz/graphql
```

Now we can start with using `graphql-request` without `graphql-codegen` to address what is the situation we can improve.

## Using graphql-request without graphql-codegen

```bash
mkdir gql-codegen
cd gql-codegen
yarn init -y
yarn add graphql-request graphql
```

Then create a file `src/index.ts` with the following content:

```ts title="src/index.ts"
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
// @ts-ignore
request(endpoint, query, variables).then(({ TokenInfos }) => console.log(TokenInfos));
```

We will see that TypeScript will complain about the type of `TokenInfos` because tsc is not able to tell if `TokenInfos` can be destructured from type `any`.

One solution is passing in the generic type to `request` function:

```ts title="src/index.ts"
// ...
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
// ...
```

No we can see the type of `TokenInfos` is correct. But this is not a good solution because we have to manually define the type of `TokenInfos` which is not scalable.

This is where `graphql-codegen` comes in.

## Using graphql-codegen

```bash
yarn add -D @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/client-preset

```

Then create a file `codegen.ts` with the following content:

```ts title="codegen.ts"
import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  documents: ["src/**/*.ts"],
  schema: "https://services.dappio.xyz/graphql",
  generates: {
    "./src/gql/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
```

Create a new script in `package.json`:

```json title="package.json"
{
  "scripts": {
    "codegen": "graphql-codegen --config codegen.ts",
    "codegen:watch": "yarn codegen --watch"
  }
}
```

Then run `yarn codegen` to generate the types for our graphQL queries.

```bash
yarn codegen
```

Now we can see that a new folder `src/gql` is created which contains the generated types for our graphQL queries and mutations in `src/gql/graphql.ts`.

We next want to generate the types for our graphQL subscriptions (or operation) that happen throughout our application in our frontend client. it could be a React app, a Vue app, or any other frontend framework.

Accordingly, we go back to `src/index.ts` and change the request using the function auto-generated by `graphql-codegen`:

```ts title="src/index.ts"
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
```

Then run `yarn codegen` again to generate the types for our graphQL queries. Then you will see in `src/gql/gql.ts` that the variable `document` is updated as below:

```ts title="src/gql/gql.ts"
// ...
const documents = {
  "\n  query Task($symbol: String!) {\n    TokenInfos(symbol: $symbol) {\n      timestamp\n      price\n      protocol\n      chainId\n      mint\n      name\n      decimals\n      symbol\n      logoURI\n    }\n  }\n":
    types.TaskDocument,
};
// ...
```

It says the Task query has the return type of `TaskDocument` which is auto-generated by `graphql-codegen`.

Now the typescript compiler will be no longer complain about the type of `TokenInfos` because it is able to infer the type from the return type of `TaskDocument`.

Congratulations! We have successfully used `graphql-codegen` to generate types for our graphQL queries.

🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉
