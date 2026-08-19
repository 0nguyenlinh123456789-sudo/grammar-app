// File: api/access.js
// VO BOC VERCEL (nen chay Node). Than tuyen nam o src/server/routes/ va
// dung CHUNG voi vo boc Cloudflare — sua logic thi sua o do, khong sua o day.
import { xuLyAccess } from '../src/server/routes/access.js';

export default async function handler(request, response) {
  return xuLyAccess(request, process.env, response);
}
