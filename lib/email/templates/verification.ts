export function verificationEmailTemplate({
  name,
  token,
}: {
  name: string;
  token: string;
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
          Use the code below to finish creating your account. This code is valid for 1 hour.
        </p>
        <div style="text-align:center;margin:24px 0;padding:18px 12px;border:1px solid rgba(245,197,24,0.8);border-radius:12px;background:rgba(245,197,24,0.04);">
          <div style="font-family:monospace;font-size:32px;letter-spacing:0.22em;font-weight:700;color:#F5C518;">${token}</div>
        </div>
        <p style="margin:0 0 10px;color:#F5F5F0;opacity:0.8;line-height:1.6;">
          Enter this code on the verification page to complete your account setup.
        </p>
        <p style="margin:0;color:#F5F5F0;opacity:0.7;line-height:1.6;">
          If you did not request this, you can ignore this email.
        </p>
      </div>
    </div>
  `;
}
