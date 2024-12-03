export const generateRoomId = (): string => {
    const dateNow = new Date()
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, "");

    const randomText = Math.random().toString(36).substring(2, 8).toUpperCase();

    const roomId = `${dateNow}${randomText}`;

    return roomId;
};
