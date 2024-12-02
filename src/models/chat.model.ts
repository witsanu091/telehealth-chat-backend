import mongoose, { Schema, Document } from 'mongoose';

export interface IChat extends Document {
    room: string;
    sender: string;
    message: string;
    created_on: Date;
}

const ChatSchema: Schema = new Schema({
    room: { type: String, required: true },
    sender: { type: String, required: true },
    message: { type: String, required: true },
    created_on: { type: Date, default: Date.now },
});

const Chat = mongoose.model<IChat>('Chat', ChatSchema);

export default Chat;
