// File: api/payment-webhook.js
// VO BOC VERCEL (nen chay Node). Than tuyen nam o src/server/routes/ va
// dung CHUNG voi vo boc Cloudflare — sua logic thi sua o do, khong sua o day.
import { xuLyPaymentWebhook } from '../src/server/routes/paymentWebhook.js';

export default async function handler(request, response) {
  return xuLyPaymentWebhook(request, process.env, response);
}
