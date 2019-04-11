import { PubSub, withFilter } from 'graphql-yoga';

export const pubsub = new PubSub();

const NEW_MESSAGE = 'NEW_MESSAGE';

const resolvers = {
    Message:{
      user: async (parent, args, { models }, info) =>{  
        return await models.User.findOne( {_id : parent.user_id} );
      },
    },
    User:{
      friends: async (parent, args, { models }, info) =>{ 
        const friends = await models.UserFriend.find( {user_id : parent._id} );
        let friends_id =[];
        friends.forEach(fd => {          
          friends_id.push(fd.friend_id)
        });
        return await  models.User.find( { _id: { $in:friends_id } });
      },
      group: async (parent, args, { models }, info) =>{
       const groupUser = await models.GroupUser.find({ user_id: parent._id });
       let groups_id =[];
       groupUser.forEach(fd => {          
          groups_id.push(fd.group_id)
        });

       return await models.Group.find({ _id: { $in: groups_id } });
      },
    },

    Group:{
      users: async (parent, args, { models }, info) =>{
        const groupUser = await models.GroupUser.find({ group_id: parent._id });
       const gb = _.groupBy(groupUser, 'user_id')     
       groupUser.map(k => gb[k] || []) ;
       return await models.User.User({ _id: { $in: groupUser } });
      },
    },

    Query: {      
      hello: (parent, args, context, info) =>(`Olá ${args.name}, seja bem vindo!`),
      messages: async (parent, args, { models }, info) =>{
        return await models.Message.find({})
      },
      users: async (parent, args, context, info) =>{
        return await context.models.User.find({})
      },
      user: async (parent, args, { models }, info) =>{
        return await models.User.findOne({ _id: args.id})
      },
      groups: async (parent, args, { models }, info) =>{
        return await models.Group.find({})
      },
      login:async (parent, { email }, { models }, info) =>{
        return await models.User.findOne({email})
      },
    },
   
    Mutation : {
      sendMessage  : async(parent, { email , message }, { models }, info) =>{
        const user = await models.User.findOne( {email} )     
        const newMessage = new models.Message( { user_id: user._id , message });
        
        try {
          await newMessage.save();
        } catch (e) {
          throw new Error('Cannot send a message!!!');
        }

        pubsub.publish(NEW_MESSAGE, {
          newMessage,
        });
      
        pubsub.publish('newMessageWithParm', { 
          newMessageWithParm:newMessage,
          channelId: newMessage.user_id
        })

        return newMessage
      },
      createUser : async(parent, args, { models }, info) =>{
        const newUser = new models.User( args.input );
        
        try {
          await newUser.save();
        } catch (e) {
          throw new Error('Cannot Save a User!!!');
        }
        return newUser
      },
      makeFriend: async(parent, { user_id, friend_id}, { models }, info) =>{
        const newUserFriend = new models.UserFriend( { user_id, friend_id} );
        
        try {
          await newUserFriend.save();
        } catch (e) {
          throw new Error('Cannot make a friends!!!');
        }
        return newUserFriend
      },
      createGroup: async (parent, { user_id, name, imagePath }, { models }, info) =>{
        const newGroup = new models.Group( { user_id, name, imagePath } );
        
        try {
          await newGroup.save();
        } catch (e) {
          throw new Error('Cannot Save a Group!!!');
        }
        const group_id =newGroup._id;
        const newGroupUser = new models.GroupUser( { group_id, user_id } );
        
        try {
          await newGroupUser.save();
        } catch (e) {
          throw new Error('Cannot Save a GroupUser!!!');
        }

        return newGroup
      },

      addUserOnGroup : async(parent, { group_id, user_id }, { models }, info) =>{
        const newUserOnGroup = new models.GroupUser( { group_id, user_id } );
        
        try {
          await newUserOnGroup.save();
        } catch (e) {
          throw new Error('Cannot add user on group!!!');
        }
        return newUserOnGroup
      },
    },

    Subscription: {
      newMessage: {
        subscribe: () => pubsub.asyncIterator(NEW_MESSAGE),
      },
      newMessageWithParm: { 
        subscribe: withFilter(()=> pubsub.asyncIterator('newMessageWithParm'),
        (payload, variables)=> {        
          return payload.channelId === variables.user_id
        })
      },
    }
    
};

module.exports = { resolvers, pubsub }