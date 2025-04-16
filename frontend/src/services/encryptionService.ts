import CryptoJS from 'crypto-js';

const AES_KEY = 'your-128-bit-key'; // Replace with secure key mgmt

export const encryptMessage = (text: string): string => {
  return CryptoJS.AES.encrypt(text, AES_KEY).toString();
};

export const decryptMessage = (cipherText: string): string => {
  const bytes = CryptoJS.AES.decrypt(cipherText, AES_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};