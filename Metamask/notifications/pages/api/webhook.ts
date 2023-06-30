import { NextApiRequest } from "next";

import { NextApiResponseServerIO } from "@/lib/types";

const webhookHandler = async (
  req: NextApiRequest,
  res: NextApiResponseServerIO
) => {
  if (req.method === "POST") {
    const notification = req.body;

    res.socket.server.io.emit("notification", notification);

    res.status(201).json(notification);
  } else {
    res.status(400).send("Invalid webhook request");
  }
};

export default webhookHandler;
