// File: api/ai.js
// VO BOC VERCEL (nen chay Node). Than tuyen nam o src/server/routes/ai.js va
// dung CHUNG voi vo boc Cloudflare — sua logic thi sua o do, khong sua o day.
import { xuLyAi } from '../src/server/routes/ai.js';

export default async function handler(request, response) {
  return xuLyAi(request, process.env, response);
}
