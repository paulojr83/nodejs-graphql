import mongoose from 'mongoose';
import User from "./user";
import UserFriend from "./user-friend";
import Group from "./group";
import GroupUser from "./group-user";
import Message from "./message";

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.set('debug', true);

export const startDB = ({ user, pwd, url, db }) => mongoose.connect(
    `mongodb://${user}:${pwd}@${url}/${db}`, { useNewUrlParser: true } );
  
export const models = { User, Group, UserFriend, GroupUser, Message, }