import { GraphQLServer } from 'graphql-yoga';
import { startDB, models } from './db';
import { resolvers, pubsub } from './graphql/resolvers';
import { express as voyagerMiddleware } from 'graphql-voyager/middleware';

const db = startDB({ 
  user: 'graphql', 
  pwd: '12qwaszx', 
  db: 'graphql', 
  url: 'ds139446.mlab.com:39446' 
})

const context = {
  pubsub,
  models,
  db,
};

const options = {    
  port: 8000,
  deduplicator: true,
  endpoint: '/graphql',     
  playground: '/playground',     
  subscriptions: '/subscriptions',
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