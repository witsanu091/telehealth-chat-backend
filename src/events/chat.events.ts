import { Socket, Server } from "socket.io";
import Chat from "../models/chat.model";
import Room from "../models/room.model";
import { generateRoomId } from "../utils/utils";

export const handleChatEvents = (socket: Socket, io: Server) => {
    // const user_id = socket.data.sender
    let { room, id } = socket.data;
    socket.on('join', async () => {
        let roomData = await Room.findOne({ room_id: room });

        if (!roomData) {
            room = generateRoomId()
            roomData = new Room({ room_id: room, members: [] });
        }

        const isMember = roomData.members.some((member) => member.user_id === id);
        if (!isMember) {
            roomData.members.push({ user_id: id, socket_id: socket.id });
            await roomData.save();
        }

        socket.join(room);
        io.to(room).emit('notification', { user_id: id, event: 'join' });

        await Chat.create({
            room,
            sender: id,
            message: `${id} joined the room`,
            event: 'join',
        });
    });
    // socket.on("join", async ({ room_id }) => {
    //     let room = await Room.findOne({ room_id: room_id });

    //     if (!room) {
    //         room_id = generateRoomId()
    //         room = new Room({ room_id: room_id, members: [] });
    //     }

    //     const isMember = room.members.some((member) => member.user_id === id);

    //     if (!isMember) {
    //         if (room.members.length >= 2) {
    //             socket.emit("error", { message: "Room is full!" });
    //             return;
    //         }

    //         room.members.push({ user_id: id, socket_id: socket.id });
    //         await room.save();
    //     }

    //     socket.join(room_id);
    //     io.to(room_id).emit("notification", { user_id: id, event: "join" });
    // });

    socket.on('message', async (message: string) => {
        const roomData = await Room.findOne({ room_id: room });

        if (!roomData || !roomData.members.some((member) => member.user_id === id)) {
            socket.emit('error', { message: 'You are not a member of this room' });
            return;
        }

        io.to(room).emit('message', { sender: id, message });

        await Chat.create({
            room_id: room,
            sender: id,
            message,
            event: 'message',
        });
    });


    socket.on('leave', async () => {
        const roomData = await Room.findOne({ room_id: room });

        if (roomData) {
            roomData.members = roomData.members.filter((member) => member.user_id !== id);
            await roomData.save();
        }

        socket.leave(room);
        io.to(room).emit('notification', { user_id: id, event: 'leave' });

        await Chat.create({
            room_id: room,
            sender: id,
            message: `${id} left the room`,
            event: 'leave',
        });
    });

    socket.on("disconnect", async () => {
        console.log("User disconnected:", socket.id);

        const rooms = await Room.find({ "members.socket_id": socket.id });

        for (const room of rooms) {
            room.members = room.members.filter((member) => member.socket_id !== socket.id);
            await room.save();

            if (room?._id) {
                io.to(room._id.toString()).emit("notification", {
                    user_id: id,
                    event: "leave",
                });
            }

        }
    });
};
