import type { NextApiRequest, NextApiResponse } from "next";

export default async function turn(req: NextApiRequest, res: NextApiResponse) {
  req;
  try {
    const request = await fetch("https://pokerd-backend.fly.dev/turn");
    const data = await request.json();
    console.log("turnData :", data);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error river server" });
  }
}
