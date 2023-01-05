import { keySchedulation } from "./libs/keySchedulation.js";
import { desCfbEncryption } from "./libs/desCfbUtils.js";

export const desCfbEncrypt = (plaintext, key, iv, mode) => {
    if (mode == "encryption") console.log({ plaintext, key, iv });
    else if (mode == "decryption") console.log({ ciphertext: plaintext, key, iv });
    else throw new Error("INVALID_MODE");
    const permutedKeys = keySchedulation(key);

    const ciphertext = desCfbEncryption(plaintext, permutedKeys, iv, mode);

    return ciphertext;
};

console.log("\nDES CFB encryption...");
const desCfbEncrypted = desCfbEncrypt("0123456789ABCDEF0A1B2C3D4E5F6A7B", "133457799BBCDFF1", "AABBCCDDAABBCCDD", "encryption");
console.log({ ciphertext: desCfbEncrypted });

console.log("\nDES CFB decryption...");
const desCfbDecrypted = desCfbEncrypt(desCfbEncrypted, "133457799BBCDFF1", "AABBCCDDAABBCCDD", "decryption");
console.log({ plaintext: desCfbDecrypted });