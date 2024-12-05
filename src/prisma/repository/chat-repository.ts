import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class ChatRepository {
  static async addChat(data: any) {
    try {
      return await prisma.chat.create({
        data,
      });
    } catch (error) {
      console.error("[Error] Adding chat log:", error);
      throw error;
    }
  }

  static async findOne(data: any) {
    try {
      return await prisma.chat.findFirst({
        where: { room: data.room_id },
      });
    } catch (error) {
      console.error("[Error] Fetching chat log:", error);
      throw error;
    }
  }

  static async findAllChatsByRoom(room_id: string) {
    try {
      return await prisma.chat.findMany({
        where: { room: room_id },
        orderBy: { created_on: "asc" },
      });
    } catch (error) {
      console.error("[Error] Fetching chats by room:", error);
      throw error;
    }
  }

}

