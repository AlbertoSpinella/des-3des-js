import { keySchedulation } from "./libs/keySchedulation.js";

export const main = (plaintext, key) => {
    const permutedKeys = keySchedulation(key);
    console.log(permutedKeys);
};

main("0123456789ABCDEF", "133457799BBCDFF1");