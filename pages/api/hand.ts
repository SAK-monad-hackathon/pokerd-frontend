import type { NextApiRequest, NextApiResponse } from "next";

export default async function flop(req: NextApiRequest, res: NextApiResponse) {
  req;
  // TODO Get the access token from Privy's `usePrivy::getAccessToken()` and store it in the `req` object when making the request
  const accessToken = "";
  try {
    const request = await fetch("https://pokerd-backend.fly.dev/hand", {
      headers: [["Authorization", `Bearer ${accessToken}`]],
    });
    const data = await request.json();
    console.log("handData :", data);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error river server" });
  }
}
