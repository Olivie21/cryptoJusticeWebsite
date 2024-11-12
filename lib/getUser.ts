"use server";

import prisma from "./prisma";

export const getUserByEmail = async () => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: "davitmaisuradze123@gmail.com" },
    });
    return user;
  } catch (error) {
    console.error("Error retrieving user:", error);
    throw error;
  }
};
