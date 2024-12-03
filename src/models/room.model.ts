import mongoose, { Schema, Document } from 'mongoose';

export interface IRoom extends Document {
    room_id: { type: String, required: true },
    name: string;
    members: Array<{
        user_id: string;
        socket_id: string;
    }>;
    created_on?: Date;

}

const RoomSchema: Schema = new Schema({
    room_id: { type: String, required: true, unique: true },
    name: { type: String },
    members: [
        {
            user_id: { type: String, required: true },
            socket_id: { type: String, required: true },
        },
    ],
    created_on: { type: Date, default: Date.now },
});

const Room = mongoose.model<IRoom>('Room', RoomSchema);

export default Room;
