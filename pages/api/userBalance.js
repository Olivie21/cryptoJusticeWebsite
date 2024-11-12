// pages/api/userBalance.js
import prisma from "../../lib/prisma"; // Adjust the path if needed // Adjust path if necessary
export default async function handler(req, res) {
  if (req.method === "GET") {
    const { email } = req.query;

    console.log("Received request to get balance for email:", email); // Add log

    try {
      const user = await prisma.user.findUnique({
        where: { email },
        // select: { balance: true },
      });

      if (!user) {
        console.error("User not found for email:", email); // Add log
        return res.status(404).json({ error: "User not found" });
      }

      console.log("User found. Returning balance:", user.balance); // Add log
      return res.status(200).json({ balance: user.balance });
    } catch (error) {
      console.error("Error retrieving user balance:", error.message); // Add log
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    console.error("Invalid method used:", req.method); // Add log
    return res.status(405).json({ error: "Method not allowed" });
  }
}
