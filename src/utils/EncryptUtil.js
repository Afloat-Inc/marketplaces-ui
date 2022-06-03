import { AES, enc, lib } from 'crypto-js'

export default class EncryptUtil {
  static encryptText (textToEncrypt, key) {
    return AES.encrypt(textToEncrypt, key).toString()
  }

  static decryptText (textEncrypted, key) {
    const bytes = AES.decrypt(textEncrypted, key)
    return bytes.toString(enc.Utf8)
  }

  static encryptFile (file, key, type = '') {
    const { name } = file
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        // Convert: ArrayBuffer -> WordArray
        const wordArray = lib.WordArray.create(reader.result)
        // Encryption: I: WordArray -> O: -> Base64 encoded string (OpenSSL-format)
        const encrypted = AES.encrypt(wordArray, key).toString()
        // Create blob from string
        const fileEnc = new Blob([encrypted])
        const file = new File([fileEnc], name, { type })
        resolve(file)
      }
      reader.onerror = reject
      reader.readAsArrayBuffer(file)
    })
  }

  static decryptFile (file, key) {
    const { name } = file
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        // Decryption: I: Base64 encoded string (OpenSSL-format) -> O: WordArray
        const decrypted = AES.decrypt(reader.result, key)
        // Convert: WordArray -> typed array
        const typedArray = EncryptUtil.convertWordArrayToUint8Array(decrypted)
        // Create blob from typed array
        const fileDec = new Blob([typedArray])
        const file = new File([fileDec], name)
        resolve(file)
      }
      reader.onerror = reject
      reader.readAsText(file)
    })
  }

  static convertWordArrayToUint8Array (wordArray) {
    const arrayOfWords = Object.prototype.hasOwnProperty.call(wordArray, 'words') ? wordArray.words : []
    const length = Object.prototype.hasOwnProperty.call(wordArray, 'sigBytes') ? wordArray.sigBytes : arrayOfWords.length * 4
    const uInt8Array = new Uint8Array(length)
    let index = 0, word, i
    for (i = 0; i < length; i++) {
      word = arrayOfWords[i]
      uInt8Array[index++] = word >> 24
      uInt8Array[index++] = (word >> 16) & 0xff
      uInt8Array[index++] = (word >> 8) & 0xff
      uInt8Array[index++] = word & 0xff
    }
    return uInt8Array
  }
}
