import { keySchedulation } from "./libs/keySchedulation.js";
import { desEcb } from "./libs/desEcb.js";

export const desEcbEncrypt = (plaintext, key) => {
    console.log({ plaintext, key });
    const permutedKeys = keySchedulation(key);

    const ciphertext = desEcb(plaintext, permutedKeys);

    return ciphertext;
};

export const desEcbDecrypt = (ciphertext, key) => {
    console.log({ ciphertext, key });
    const permutedKeys = keySchedulation(key);

    const reversedKeys = [...permutedKeys].reverse();
    const plaintext = desEcb(ciphertext, reversedKeys);

    return plaintext;
};

console.log("DES ECB encryption...");
const desEcbEncrypted = desEcbEncrypt("0123456789ABCDEF", "133457799BBCDFF1");
console.log({ ciphertext: desEcbEncrypted });

console.log("\nDES ECB decryption...");
const desEcbDecrypted = desEcbDecrypt(desEcbEncrypted, "133457799BBCDFF1");
console.log({ plaintext: desEcbDecrypted });