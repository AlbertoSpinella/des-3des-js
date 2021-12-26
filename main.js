import { keySchedulation } from "./libs/keySchedulation.js";
import { desEncryption } from "./libs/desEncryption.js";

export const desEncrypt = (plaintext, key) => {
    console.log({ plaintext, key });
    const permutedKeys = keySchedulation(key);

    const ciphertext = desEncryption(plaintext, permutedKeys);

    return ciphertext;
};

export const desDecrypt = (ciphertext, key) => {
    console.log({ ciphertext, key });
    const permutedKeys = keySchedulation(key);

    const reversedKeys = permutedKeys.reverse();
    const plaintext = desEncryption(ciphertext, reversedKeys);

    return plaintext;
};

console.log("DES encryption...");
const encrypted = desEncrypt("0123456789ABCDEF", "133457799BBCDFF1");
console.log({ ciphertext: encrypted });

console.log("\nDES decryption...");
const decrypted = desDecrypt(encrypted, "133457799BBCDFF1");
console.log({ plaintext: decrypted });