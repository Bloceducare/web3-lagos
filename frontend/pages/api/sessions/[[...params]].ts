import type { NextApiRequest, NextApiResponse } from "next";

const API_BASE_URL = process.env.API_URL;

const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

function getCacheKey(url: string): string {
  return url;
}

function getFromCache(key: string) {
  const cached = cache.get(key);
  if (!cached) return null;

  if (Date.now() - cached.timestamp > CACHE_DURATION) {
    cache.delete(key);
    return null;
  }

  return cached.data;
}

function setCache(key: string, data: any) {
  cache.set(key, { data, timestamp: Date.now() });
}

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
    const url = `${API_BASE_URL}/sessions/${pathSuffix}${
      queryString ? `?${queryString}` : ""
    }`;

    // Check cache first
    const cacheKey = getCacheKey(url);
    const cachedData = getFromCache(cacheKey);

    if (cachedData) {
      res.setHeader(
        "Cache-Control",
        "s-maxage=300, stale-while-revalidate=600"
      );
      res.setHeader("X-Cache", "HIT");
      return res.status(200).json(cachedData);
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(
        `Sessions API Error: ${response.status} - ${response.statusText}`
      );
      return res.status(response.status).json(data);
    }

    // Cache successful responses
    setCache(cacheKey, data);

    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");
    res.setHeader("X-Cache", "MISS");
    res.status(200).json(data);
  } catch (error) {
    console.error("Sessions API Proxy Error:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
