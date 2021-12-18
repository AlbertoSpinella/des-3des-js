import {
    hexToBin,
    padKey
} from "./libs/utils.js";

import {
    PC1,
    shiftAfterPC1,
    PC2
} from "./libs/keySchedulation.js";

const splittedKey = {};
const cArray = [];
const dArray = [];

export const keySchedulation = (key) => {
    const paddedKey = padKey(key);
    const binaryKey = hexToBin(paddedKey);
    const permuted1Key = PC1(binaryKey);
    const cArray0 = permuted1Key.substring(0, permuted1Key.length/2);
    const dArray0 = permuted1Key.substring(permuted1Key.length/2, permuted1Key.length);
    const { cArray, dArray } = shiftAfterPC1(cArray0, dArray0);
    const permuted2Keys = PC2(cArray, dArray);
    return permuted2Keys;
};


export const main = (plaintext, key) => {
    const permutedKeys = keySchedulation(key);
    console.log(permutedKeys);
};

main("0123456789ABCDEF", "133457799BBCDFF1");