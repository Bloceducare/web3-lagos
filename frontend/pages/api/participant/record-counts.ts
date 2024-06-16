import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import connectDB from "@servers/config/index";
import participantsDb from "@servers/models/participant";

connectDB();

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(async (req, res) => {
  try {
    const users = await participantsDb.countDocuments({});

    return res.status(200).json({
      status: true,
      total: users,
    });
  } catch (e) {
    return res.status(500).json({
      status: false,
      error: "server error",
    });
  }
});

export default router.handler({
  // @ts-ignore
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
});
