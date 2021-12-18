import {
    IPTable
} from "./tables.js";

import { hexToBin } from "./utils.js";

export const IP = (plaintext) => {
    let result = "";
    for (let i=0; i<IPTable.length; i++) {
        const current =IPTable[i];
        result += plaintext[current-1];
    }
    return result;
};

export const splitInL0AndR0 = (IPedPlaintext) => {
    const L0 = IPedPlaintext.substring(0, IPedPlaintext.length/2);
    const R0 = IPedPlaintext.substring(IPedPlaintext.length/2, IPedPlaintext.length);
    return { L0, R0 };
};

export const desEncryption = (plaintext) => {
    const binaryPlaintext = hexToBin(plaintext);
    const IPedPlaintext = IP(binaryPlaintext);
    const { L0, R0 } = splitInL0AndR0(IPedPlaintext);
    console.log({ L0, R0 });
};