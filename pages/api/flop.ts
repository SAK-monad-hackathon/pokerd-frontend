import type { NextApiRequest, NextApiResponse } from "next";

export default async function flop(req: NextApiRequest, res: NextApiResponse) {
  req;
  try {
    // Simulate
    const flopData = [
      { value: "Jack", suit: "Spade" },
      { value: "Three", suit: "Heart" },
      { value: "Five", suit: "Diamond" },
    ];
    console.log("flopData :", flopData);

    res.status(200).json(flopData);
  } catch (error) {
    res.status(500).json({ error: "Error flop server" });
  }
}
