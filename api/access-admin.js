// File: api/access-admin.js
// VO BOC VERCEL (nen chay Node). Than tuyen nam o src/server/routes/ va
// dung CHUNG voi vo boc Cloudflare — sua logic thi sua o do, khong sua o day.
import { xuLyAccessAdmin } from '../src/server/routes/accessAdmin.js';

export default async function handler(request, response) {
  return xuLyAccessAdmin(request, process.env, response);
}
