import * as crypto from 'crypto'

/**
 * 解密
 * @param dataStr {string}
 * @param key {string}
 * @param iv {string}
 * @return {string}
 */
export function decrypt(dataStr, key, iv): string {
  const cipherChunks = [];
  const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
  decipher.setAutoPadding(true);
  cipherChunks.push(decipher.update(dataStr, 'base64', 'utf8'));
  cipherChunks.push(decipher.final('utf8'));
  return cipherChunks.join('');
}

/**
 * 加密
 * @param dataStr {string}
 * @param key {string}
 * @param iv {string}
 * @return {string}
 */
export function encrypt(dataStr, key, iv) {
  const cipherChunks = [];
  const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
  cipher.setAutoPadding(true);
  cipherChunks.push(cipher.update(dataStr, 'utf8', 'base64'));
  cipherChunks.push(cipher.final('base64'));
  return cipherChunks.join('');
}

export function WXBizDataCrypt(appId, sessionKey, encryptedData, iv) {
  // base64 decode
  sessionKey = Buffer.from(sessionKey, 'base64');
  encryptedData = Buffer.from(encryptedData, 'base64');
  iv = Buffer.from(iv, 'base64');

  let decoded;
  try {
    // 解密
    const decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv);
    // 设置自动 padding 为 true，删除填充补位
    decipher.setAutoPadding(true);
    decoded = decipher.update(encryptedData, 'binary', 'utf8');
    decoded += decipher.final('utf8');
    decoded = JSON.parse(decoded)
  } catch (err) {
    throw new Error('解密失败')
  }

  if (decoded.watermark.appid !== appId) {
    throw new Error('appid 错误')
  }

  return decoded
}

/**
 * @param {string} algorithm
 * @param {any} content
 *  @return {string}
 */
export const signEncrypt = (algorithm, content) => {
  const hash = crypto.createHash(algorithm);
  hash.update(content);
  return hash.digest('hex')
};

/**
 * @param {any} content
 *  @return {string}
 */
export const sha1 = (content) => signEncrypt('sha1', content);