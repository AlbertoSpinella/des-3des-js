import {
    hexToBin,
    padKey,
    PC1,
    shiftAfterPC1
} from "./libs/utils.js";

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
    console.log({ cArray, dArray });
};


export const main = (plaintext, key) => {
    keySchedulation(key);
};

main("0123456789ABCDEF", "133457799BBCDFF1");