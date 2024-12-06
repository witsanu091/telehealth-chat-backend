import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class MemberRepository {
    static async addMember(data: { user_id: string; socket_id: string; room_id: string }) {
        try {

            const existingMember = await prisma.member.findFirst({
                where: {
                    user_id: data.user_id,
                    room_id: data.room_id,
                },
            });

            if (existingMember) {
                throw new Error(`User ${data.user_id} is already a member of room ${data.room_id}`);
            }

            const result = await prisma.member.create({
                data: {
                    user_id: data.user_id,
                    socket_id: data.socket_id,
                    room_id: data.room_id,
                },
            });
            return result
        } catch (error) {
            console.error("[Error] Adding member:", error);
            throw error;
        }
    }

    static async deleteMemberBySocketId(socket_id: string) {
        try {
            return await prisma.member.deleteMany({
                where: { socket_id },
            });
        } catch (error) {
            console.error("[Error] Deleting member:", error);
            throw error;
        }
    }
}
