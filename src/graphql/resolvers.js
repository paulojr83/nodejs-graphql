const resolvers = {
    
    Query: {      
      hello: (parent, args, context, info) =>(`Olá ${args.name}, seja bem vindo!`)
    },
};

module.exports = {resolvers }