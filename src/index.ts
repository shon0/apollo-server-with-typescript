import {ApolloServer} from 'apollo-server';
import {loadSchemaSync} from '@graphql-tools/load';
import {GraphQLFileLoader} from '@graphql-tools/graphql-file-loader';
import {addResolversToSchema} from '@graphql-tools/schema';
import {join} from 'path';

// sample data
const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

const schema = loadSchemaSync(join(__dirname, '../schema.graphql'), {
  loaders: [new GraphQLFileLoader()],
});

const resolvers = {
  Query: {
    books: () => books,
  },
};

const schemaWithResolver = addResolversToSchema({schema, resolvers});

const server = new ApolloServer({schema: schemaWithResolver});

server.listen().then(({url}) => {
  console.log(`🚀 Server ready at ${url}`);
});
