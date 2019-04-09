import { GraphQLServer } from 'graphql-yoga';
import { resolvers } from './graphql/resolvers';
import { express as voyagerMiddleware } from 'graphql-voyager/middleware';

const context = {};

const options = {    
  port: 8000,
  deduplicator: true,
  endpoint: '/graphql',     
  playground: '/playground'
}

const server = new GraphQLServer({
  typeDefs: `${__dirname}/graphql/schema.graphql`,  
  resolvers,
  context,
});

server.use('/voyager', voyagerMiddleware({ endpointUrl: '/graphql' }));

server.start(options, ({port}) => { 
  console.log(` "\ {^_^}/ My GraphQL is running on http://localhost:${port}`);
});