import { keySchedulation } from "./libs/keySchedulation.js";
import { desEcb } from "./libs/desEcb.js";
import {
    desCbcEncryption,
    desCbcDecryption
} from "./libs/desCbc.js";
import { desCfbEncryption } from "./libs/desCfb.js";

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

export const desCfbEncrypt = (plaintext, key, iv, mode) => {
    console.log({ plaintext, key, iv });
    const permutedKeys = keySchedulation(key);

    const ciphertext = desCfbEncryption(plaintext, permutedKeys, iv, mode);

    return ciphertext;
};

console.log("DES ECB encryption...");
const desEcbEncrypted = desEcbEncrypt("0123456789ABCDEF", "133457799BBCDFF1");
console.log({ ciphertext: desEcbEncrypted });

console.log("\nDES ECB decryption...");
const desEcbDecrypted = desEcbDecrypt(desEcbEncrypted, "133457799BBCDFF1");
console.log({ plaintext: desEcbDecrypted });

console.log("\nDES CBC encryption...");
const desCbcEncrypted = desCbcEncrypt("0123456789ABCDEF0A1B2C3D4E5F6A7B", "133457799BBCDFF1", "AABBCCDDAABBCCDD");
console.log({ ciphertext: desCbcEncrypted });

console.log("\nDES CBC decryption...");
const desCbcDecrypted = desCbcDecrypt(desCbcEncrypted, "133457799BBCDFF1", "AABBCCDDAABBCCDD");
console.log({ plaintext: desCbcDecrypted });

console.log("\nDES CFB encryption...");
const desCfbEncrypted = desCfbEncrypt("0123456789ABCDEF0A1B2C3D4E5F6A7B", "133457799BBCDFF1", "AABBCCDDAABBCCDD", "encryption");
console.log({ ciphertext: desCfbEncrypted });

console.log("\nDES CFB decryption...");
const desCfbDecrypted = desCfbEncrypt(desCfbEncrypted, "133457799BBCDFF1", "AABBCCDDAABBCCDD", "decryption");
console.log({ plaintext: desCfbDecrypted });