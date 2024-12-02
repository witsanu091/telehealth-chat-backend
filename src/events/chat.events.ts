import { Socket, Server } from 'socket.io';
import Chat from '../models/chat.model';

export const handleChatEvents = (socket: Socket, io: Server) => {

    socket.on('join', async (room: string) => {
        if (!room) {
            console.warn(`⚠️ No room specified for client: ${socket.id}`);
            return;
        }

        try {
            socket.join(room);
            console.log(`✅ User joined room: ${room}`);
            await Chat.create({ room, sender: 'system', message: `User joined room: ${room}` });
        } catch (err) {
            console.error('❌ Error in join event:', err);
        }
    });

    socket.on('message', async (data: { room: string; sender: string; message: string }) => {
        if (!data.room || !data.message) {
            console.warn(`⚠️ Missing room or message data: ${JSON.stringify(data)}`);
            return;
        }
        try {
            console.log('📩 Message received:', data);
            const chatMessage = await Chat.create({
                room: data.room,
                sender: data.sender,
                message: data.message,
            });
            io.to(data.room).emit('message', chatMessage);
        } catch (err) {
            console.error('❌ Error in message event:', err);
        }
    });

    socket.on('leave', async (room: string) => {
        if (!room) {
            console.warn(`⚠️ No room specified for client: ${socket.id}`);
            return;
        }

        try {
            socket.leave(room);
            console.log(`✅ User left room: ${room}`);
            await Chat.create({ room, sender: 'system', message: `User left room: ${room}` });
        } catch (err) {
            console.error('❌ Error in leave event:', err);
        }
    });

    socket.on('disconnect', () => {
        console.log(`❌ Client disconnected: ${socket.id}`);
    });
};
