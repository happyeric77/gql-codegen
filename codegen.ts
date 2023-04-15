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
