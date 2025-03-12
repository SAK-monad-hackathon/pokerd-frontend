import type { NextApiRequest, NextApiResponse } from "next";

export default async function turn(req: NextApiRequest, res: NextApiResponse) {
  req;
  try {
    // Simulate
    const turnData = [
      {
        value: "Ace",
        suit: "Diamond",
      },
    ];
    console.log("turnData :", turnData);

    res.status(200).json(turnData);
  } catch (error) {
    res.status(500).json({ error: "Error turn server" });
  }
}
