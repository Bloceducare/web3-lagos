import type { NextApiRequest, NextApiResponse } from "next";

const API_BASE_URL = process.env.API_URL;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req;

  try {
    const path = Array.isArray(query.path)
      ? query.path.join("/")
      : query.path || "conferences";

    const url = `${API_BASE_URL}/${path}/`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(`API Error: ${response.status} - ${response.statusText}`);
      return res.status(response.status).json(data);
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("API Proxy Error:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
