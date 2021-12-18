import {
    IPTable,
    expansionTable
} from "./tables.js";

import {
    hexToBin,
    xor
} from "./utils.js";

export const IP = (plaintext) => {
    let result = "";
    for (let i=0; i<IPTable.length; i++) {
        const current =IPTable[i];
        result += plaintext[current-1];
    }
    return result;
};

export const splitInL0AndR0 = (IPedPlaintext) => {
    if (IPedPlaintext.length != 64) throw new Error("ERR_IPED_PLAINTEXT_LENGTH_NOT_64");
    const L0 = IPedPlaintext.substring(0, IPedPlaintext.length/2);
    const R0 = IPedPlaintext.substring(IPedPlaintext.length/2, IPedPlaintext.length);
    return { L0, R0 };
};

export const feistelExpansion = (previousR) => {
    let expanded = "";
    for (let i=0; i<expansionTable.length; i++) {
        const current = expansionTable[i];
        expanded += previousR[current-1];
    }
    return expanded;
};

export const feistel = (previousR, iKey) => {
    const feistelExpanded =  feistelExpansion(previousR);
    const feistelXored = xor(feistelExpanded, iKey);
    console.log({ feistelXored });
};

export const encryptionRound = (L0, R0, permutedKeys) => {
    const LArray = [];
    const RArray = [];
    LArray.push(L0);
    RArray.push(R0);
    for (let round=0; round<16; round++) {
        const current = {};
        current.Li = RArray[round];
        const feistelEncrypted  = feistel(RArray[round], permutedKeys[round]);
        // current.Ri = xor(LArray[round], feistelEncrypted);
    }
};

export const desEncryption = (plaintext, permutedKeys) => {
    if (plaintext.length != 16) throw new Error("ERR_PLAINTEXT_LENGTH_NOT_16");
    const binaryPlaintext = hexToBin(plaintext);
    const IPedPlaintext = IP(binaryPlaintext);
    const { L0, R0 } = splitInL0AndR0(IPedPlaintext);
    console.log({ L0, R0 });
    const { LArray, RArray } = encryptionRound(L0, R0, permutedKeys);
};