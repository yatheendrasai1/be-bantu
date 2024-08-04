import type { VercelRequest, VercelResponse } from '@vercel/node'

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { name = 'World' } = req.query
  return res.json({
    message: `Hello ${name}!`,
  })
}

// export const config = {
//   runtime: 'nodejs',
// };

export function GET(request: Request) {
  return new Response(`Notifications ,............`);
}