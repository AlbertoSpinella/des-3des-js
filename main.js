import {
    hexToBin,
    padKey,
    PC1,
    shiftAfterPC1
} from "./libs/utils.js";

const plaintext = "0123456789ABCDEF";
const key = "133457799BBCDFF1";

const splittedKey = {};

export const keySchedulation = (key) => {
    const paddedKey = padKey(key);
    const binaryKey = hexToBin(paddedKey);
    const permuted1Key = PC1(binaryKey);
    const cArray = [];
    const dArray = [];
    cArray.push(permuted1Key.substring(0, permuted1Key.length/2));
    dArray.push(permuted1Key.substring(permuted1Key.length/2, permuted1Key.length));
    shiftAfterPC1(cArray, dArray);
};


export const main = (plaintext, key) => {
    keySchedulation(key);
};