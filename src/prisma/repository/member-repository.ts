import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class MemberRepository {
    static async addMember(data: any) {
        try {
            return await prisma.member.create({ data });
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
