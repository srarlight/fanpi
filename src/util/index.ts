const CryptoJS = require('crypto-js');  //引用AES源码js

export function isNull(value: any) {
  return [null, undefined, ""].includes(value)
};

export function randomString(length: number) {
  const str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  // eslint-disable-next-line no-plusplus
  for (let i = length; i > 0; --i)
    result += str[Math.floor(Math.random() * str.length)];
  return result;
}





const key = CryptoJS.enc.Utf8.parse("1234123412ABCDEF");  //十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412');   //十六位十六进制数作为密钥偏移量

//解密方法
//加密方法

export function Encrypt(word: any) {
  const srcs = CryptoJS.enc.Utf8.parse(word);
  const encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  return encrypted.ciphertext.toString().toUpperCase();
}
