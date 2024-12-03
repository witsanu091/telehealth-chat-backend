import mongoose, { Schema, Document } from 'mongoose';

export interface IChat extends Document {
    room: String,
    sender: String,
    message: String,
    event: String,
    created_on: Date;
}

const ChatSchema: Schema = new Schema({
    room: String,
    sender: String,
    message: String,
    event: String,
    created_on: { type: Date, default: Date.now },
});

const Chat = mongoose.model<IChat>('Chat', ChatSchema);

export default Chat;
