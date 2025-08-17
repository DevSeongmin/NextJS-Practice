import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ time: string }>
) {
  const date = new Date();
  res.json({ time: date.toLocaleString() });
}
