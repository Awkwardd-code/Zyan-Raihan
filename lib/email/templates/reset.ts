export function resetEmailTemplate({
  name,
  url,
  code,
}: {
  name: string;
  url: string;
  code: string;
}) {
  return `
    <div style="margin:0;padding:32px 20px;background:#0A0F1C;font-family:Arial,sans-serif;color:#F5F5F0;">
      <div style="max-width:560px;margin:0 auto;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:32px;">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;">
          <div style="width:32px;height:32px;border-radius:10px;background:#F5C518;color:#0A0F1C;font-weight:700;display:inline-flex;align-items:center;justify-content:center;">Z</div>
          <div style="font-size:14px;letter-spacing:0.2em;text-transform:uppercase;color:#F5F5F0;opacity:0.8;">Zayn Raihan</div>
        </div>
        <h1 style="margin:0 0 8px;font-size:28px;line-height:1.2;color:#F5F5F0;">Hi ${name},</h1>
        <p style="margin:0 0 20px;color:#F5F5F0;opacity:0.8;line-height:1.6;">
          We received a request to reset your password. Click the button below to continue.
        </p>
        <div style="text-align:center;margin:24px 0;">
          <a href="${url}" style="display:inline-block;padding:14px 22px;background:#F5C518;color:#0A0F1C;text-decoration:none;border-radius:12px;font-weight:700;">Reset your password</a>
        </div>
        <p style="margin:0 0 10px;color:#F5F5F0;opacity:0.8;line-height:1.6;">
          Or use this code: <span style="font-family:monospace;letter-spacing:0.12em;color:#F5C518;">${code}</span>
        </p>
        <p style="margin:0;color:#F5F5F0;opacity:0.7;line-height:1.6;">
          This link is valid for 1 hour and can be used only once. If you did not request a password reset, you can safely ignore this email.
        </p>
      </div>
    </div>
  `;
}
