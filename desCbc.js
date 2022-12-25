import { keySchedulation } from "./libs/keySchedulation.js";
import {
    desCbcEncryption,
    desCbcDecryption
} from "./libs/desCbcUtils.js";

export const desCbcEncrypt = (plaintext, key, iv) => {
    console.log({ plaintext, key, iv });
    const permutedKeys = keySchedulation(key);

    const ciphertext = desCbcEncryption(plaintext, permutedKeys, iv);

    return ciphertext;
};

export const desCbcDecrypt = (ciphertext, key, iv) => {
    console.log({ ciphertext, key, iv });
    const permutedKeys = keySchedulation(key);

    const plaintext = desCbcDecryption(ciphertext, permutedKeys, iv);

    return plaintext;
};

console.log("\nDES CBC encryption...");
const desCbcEncrypted = desCbcEncrypt("0123456789ABCDEF0A1B2C3D4E5F6A7B", "133457799BBCDFF1", "AABBCCDDAABBCCDD");
console.log({ ciphertext: desCbcEncrypted });

console.log("\nDES CBC decryption...");
const desCbcDecrypted = desCbcDecrypt(desCbcEncrypted, "133457799BBCDFF1", "AABBCCDDAABBCCDD");
console.log({ plaintext: desCbcDecrypted });