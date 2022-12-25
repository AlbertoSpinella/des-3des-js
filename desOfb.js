import { keySchedulation } from "./libs/keySchedulation.js";
import { desOfbEncryption } from "./libs/desOfbUtils.js";

export const desOfbEncrypt = (plaintext, key, iv) => {
    console.log({ plaintext, key, iv });
    const permutedKeys = keySchedulation(key);

    const ciphertext = desOfbEncryption(plaintext, permutedKeys, iv);

    return ciphertext;
};

console.log("\nDES OFB encryption...");
const desOfbEncrypted = desOfbEncrypt("0123456789ABCDEF0A1B2C3D4E5F6A7B", "133457799BBCDFF1", "AABBCCDDAABBCCDD");
console.log({ ciphertext: desOfbEncrypted });

console.log("\nDES OFB decryption...");
const desOfbDecrypted = desOfbEncrypt(desOfbEncrypted, "133457799BBCDFF1", "AABBCCDDAABBCCDD");
console.log({ plaintext: desOfbDecrypted });