// File: api/progress.js
// VO BOC VERCEL (nen chay Node). Than tuyen nam o src/server/routes/ va
// dung CHUNG voi vo boc Cloudflare — sua logic thi sua o do, khong sua o day.
import { xuLyProgress } from '../src/server/routes/progress.js';

export default async function handler(request, response) {
  return xuLyProgress(request, process.env, response);
}
