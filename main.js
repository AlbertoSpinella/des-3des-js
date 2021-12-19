import { keySchedulation } from "./libs/keySchedulation.js";
import { desEncryption } from "./libs/desEncryption.js";

export const main = (plaintext, key) => {
    const permutedKeys = keySchedulation(key);
    // console.log(permutedKeys);

    const ciphertext = desEncryption(plaintext, permutedKeys);
    console.log({ ciphertext });
};

main("0123456789ABCDEF", "133457799BBCDFF1");