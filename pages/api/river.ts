import type { NextApiRequest, NextApiResponse } from "next";

export default async function river(req: NextApiRequest, res: NextApiResponse) {
  req;
  try {
    // Simulate
    const riverData = [
      {
        value: "Jack",
        suit: "Club",
      },
    ];
    console.log("riverData :", riverData);

    res.status(200).json(riverData);
  } catch (error) {
    res.status(500).json({ error: "Error river server" });
  }
}
