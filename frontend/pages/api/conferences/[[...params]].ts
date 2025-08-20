import type { NextApiRequest, NextApiResponse } from "next";

const API_BASE_URL = process.env.API_URL;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req;

  try {
    const { id, ...otherQuery } = query;
    const pathSuffix = id ? `${id}/` : "";
    const queryString = new URLSearchParams(
      otherQuery as Record<string, string>
    ).toString();
    const url = `${API_BASE_URL}/conferences/${pathSuffix}${
      queryString ? `?${queryString}` : ""
    }`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(
        `Conferences API Error: ${response.status} - ${response.statusText}`
      );
      return res.status(response.status).json(data);
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Conferences API Proxy Error:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
