// File: functions/api/access-admin.js
// VO BOC CLOUDFLARE PAGES (nen chay kieu Web). Than tuyen nam o
// src/server/routes/ va dung CHUNG voi vo boc Vercel.
//
// Khac Vercel o hai cho, va ca hai deu do than tuyen tu lo:
//   · `env` den tu tham so, KHONG phai process.env (tren Workers no rong);
//   · tra ve mot `Response` kieu Web — dat duoc vi jsonResponse nhan null.
import { xuLyAccessAdmin } from '../../src/server/routes/accessAdmin.js';

export async function onRequest({ request, env }) {
  return xuLyAccessAdmin(request, env);
}
