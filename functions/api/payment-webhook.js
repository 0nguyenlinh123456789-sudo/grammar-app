// File: functions/api/payment-webhook.js
// VO BOC CLOUDFLARE PAGES (nen chay kieu Web). Than tuyen nam o
// src/server/routes/ va dung CHUNG voi vo boc Vercel.
import { xuLyPaymentWebhook } from '../../src/server/routes/paymentWebhook.js';

export async function onRequest({ request, env }) {
  return xuLyPaymentWebhook(request, env);
}
