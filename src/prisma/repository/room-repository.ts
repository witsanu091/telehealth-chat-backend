import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class RoomRepository {
  static async findRoomById(data: any) {
    try {
      let roomData = await prisma.room.findFirst({
        where: { room_id: data.room },
        include: { members: true },
      });
      return roomData
    } catch (error) {
      console.error("[Error] Finding room:", error);
      throw error;
    }
  }

  static async createRoom(data: any) {
    try {
      return await prisma.room.create({
        data,
        include: { members: true },
      });
    } catch (error) {
      console.error("[Error] Creating room:", error);
      throw error;
    }
  }
}
