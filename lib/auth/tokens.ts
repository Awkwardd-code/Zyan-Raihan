export function generateVerificationToken() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let token = "";

  for (let i = 0; i < 8; i += 1) {
    token += alphabet[Math.floor(Math.random() * alphabet.length)];
  }

  return token;
}

export function generateResetCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
  let code = "";

  for (let i = 0; i < 15; i += 1) {
    code += alphabet[Math.floor(Math.random() * alphabet.length)];
  }

  return code;
}
