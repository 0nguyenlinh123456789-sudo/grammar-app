// File: src/utils/shareCard.js
// Renders a 1080×1080 achievement card on a canvas and downloads it as PNG —
// something learners can post to Facebook/Zalo. Pure client-side.

const loadImage = (src) => new Promise((resolve, reject) => {
  const img = new Image();
  img.onload = () => resolve(img);
  img.onerror = reject;
  img.src = src;
});

export async function downloadAchievementCard({ rank, xp, streak, completed, total, badges }) {
  const size = 1080;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  // Cream background + dotted texture like the app
  ctx.fillStyle = '#fdfbf7';
  ctx.fillRect(0, 0, size, size);
  ctx.fillStyle = '#e2e8f0';
  for (let x = 40; x < size; x += 48) {
    for (let y = 40; y < size; y += 48) {
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Neubrutalist frame
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 14;
  const r = 60;
  const inset = 40;
  ctx.beginPath();
  ctx.roundRect(inset, inset, size - inset * 2, size - inset * 2, r);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.stroke();

  // Bunny mascot
  try {
    const bunny = await loadImage('/bunny_logo.png');
    ctx.drawImage(bunny, size / 2 - 130, 90, 260, 260);
  } catch { /* card still works without the mascot */ }

  const center = size / 2;
  ctx.textAlign = 'center';
  ctx.fillStyle = '#0f172a';
  ctx.font = '900 64px Outfit, Inter, sans-serif';
  ctx.fillText('Bunny English', center, 420);

  ctx.fillStyle = '#ec4899';
  ctx.font = '900 34px Outfit, Inter, sans-serif';
  ctx.fillText(rank, center, 478);

  // Stat pills
  const stats = [
    [`🔥 ${streak} ngày liên tiếp`, '#fff1f2', '#e11d48'],
    [`⚡ ${xp} XP · ${completed}/${total} chặng`, '#fefce8', '#a16207'],
    [`🏅 ${badges} huy hiệu`, '#eef2ff', '#4338ca'],
  ];
  let y = 560;
  for (const [text, bg, color] of stats) {
    ctx.font = '900 40px Outfit, Inter, sans-serif';
    const w = ctx.measureText(text).width + 90;
    ctx.fillStyle = bg;
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.roundRect(center - w / 2, y - 52, w, 80, 24);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.fillText(text, center, y + 4);
    y += 120;
  }

  ctx.fillStyle = '#94a3b8';
  ctx.font = '700 30px Outfit, Inter, sans-serif';
  ctx.fillText(new Intl.DateTimeFormat('vi-VN').format(new Date()), center, 960);

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `bunny-english-thanh-tich-${new Date().toISOString().slice(0, 10)}.png`;
      link.click();
      URL.revokeObjectURL(url);
      resolve(true);
    }, 'image/png');
  });
}
