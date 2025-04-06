// services/encryptionService.js

const crypto = require('crypto');

// AES-128 requires a 16-byte key and 16-byte IV
const ENCRYPTION_KEY = Buffer.from(process.env.ENCRYPTION_KEY, 'hex'); // 32 chars hex = 16 bytes
const IV_LENGTH = 16; // AES block size

// Encrypt message
const encryptMessage = (text) => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-128-cbc', ENCRYPTION_KEY, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
};

// Decrypt message
const decryptMessage = (encryptedText) => {
  const parts = encryptedText.split(':');
  if (parts.length !== 2) throw new Error('Invalid encrypted format');

  const iv = Buffer.from(parts[0], 'hex');
  const encrypted = parts[1];
  const decipher = crypto.createDecipheriv('aes-128-cbc', ENCRYPTION_KEY, iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

module.exports = {
  encryptMessage,
  decryptMessage,
};
