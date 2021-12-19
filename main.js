import { keySchedulation } from "./libs/keySchedulation.js";
import { desEncryption } from "./libs/desEncryption.js";

export const main = (plaintext, key) => {
    console.log({ plaintext, key });
    const permutedKeys = keySchedulation(key);

    const ciphertext = desEncryption(plaintext, permutedKeys);
    return ciphertext;
};

console.log({ ciphertext: main("0123456789ABCDEF", "133457799BBCDFF1") });