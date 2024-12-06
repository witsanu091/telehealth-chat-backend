import { Socket, Server } from "socket.io";
import { generateRoomId } from "../utils/utils";
import RoomRepository from "../prisma/repository/room-repository";
import MemberRepository from "../prisma/repository/member-repository";
import ChatRepository from "../prisma/repository/chat-repository";

export const handleChatEvents = (socket: Socket, io: Server) => {
    let { room, id } = socket.data;

    socket.on("join", async () => {
        let roomData = await RoomRepository.findRoomById({ room_id: room });

        if (!roomData) {
            room = generateRoomId();
            roomData = await RoomRepository.createRoom({ room_id: room });
        }

        const isMember = roomData.members.some((member: any) => {
            console.log("🚀  member.user_id:", member.user_id)
            member.user_id === id
        });
        if (roomData.members.length >= 2) {
            socket.emit("error", { message: "Room is full!" });
            return;
        }
        if (!isMember) {
            await MemberRepository.addMember({
                user_id: id,
                socket_id: socket.id,
                room_id: room,
            });
        }

        socket.join(room);
        io.to(room).emit("notification", { user_id: id, event: "join" });

        await ChatRepository.addChat({
            room,
            sender: id,
            message: `${id} joined the room`,
            event: "join",
        });
    });

    socket.on("message", async (message: string) => {

        const roomData = await RoomRepository.findRoomById({ room_id: room, user_id: id });
        console.log("🚀  roomData.members:", roomData?.members)

        if (!roomData || !roomData.members.some((member: any) => {
            member.user_id === id
            console.log("🚀  member.user_id:", member.user_id)

        })) {
            socket.emit("error", { message: "You are not a member of this room" });
            return;
        }

        io.to(room).emit("message", { sender: id, message });

        await ChatRepository.addChat({
            room,
            sender: id,
            message,
            event: "message",
        });
    });

    socket.on("leave", async () => {

        const roomData = await RoomRepository.findRoomById({ room_id: room, user_id: id });

        if (roomData) {
            await MemberRepository.deleteMemberBySocketId(socket.id);
        }

        socket.leave(room);
        io.to(room).emit("notification", { user_id: id, event: "leave" });

        await ChatRepository.addChat({
            room,
            sender: id,
            message: `${id} left the room`,
            event: "leave",
        });
    });

    socket.on("disconnect", async () => {
        console.log("User disconnected:", socket.id);

        await MemberRepository.deleteMemberBySocketId(socket.id);

        io.to(room).emit("notification", {
            user_id: id,
            event: "leave",
        });
    });
};
