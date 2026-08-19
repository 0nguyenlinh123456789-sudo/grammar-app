// File: functions/api/progress.js
// VO BOC CLOUDFLARE PAGES (nen chay kieu Web). Than tuyen nam o
// src/server/routes/ va dung CHUNG voi vo boc Vercel.
//
// Khac Vercel o hai cho, va ca hai deu do than tuyen tu lo:
//   · `env` den tu tham so, KHONG phai process.env (tren Workers no rong);
//   · tra ve mot `Response` kieu Web — dat duoc vi jsonResponse nhan null.
import { xuLyProgress } from '../../src/server/routes/progress.js';

export async function onRequest({ request, env }) {
  return xuLyProgress(request, env);
}
