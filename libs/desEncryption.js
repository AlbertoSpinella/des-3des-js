import {
    IPTable,
    expansionTable,
    sTable,
    pTable
} from "./tables.js";

import {
    hexToBin,
    xor,
    intToBinPadded
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

export const findInS = (i, six) => {
    let row = "";
    let col = "";
    for (let j=0; j<six.length; j++) {
        if (j%6 == 0 || j%6 == 5) row += six[j];
        else col += six[j];
    }
    row = parseInt(row, 2);
    col = parseInt(col, 2);
    const numericSResult = sTable[i][row][col];
    const binarySResult =  intToBinPadded(numericSResult);
    return binarySResult;
};

export const sBoxDivision = (feistelXored) => {
    let sBoxResult = "";
    for (let i=0; i<8; i++) {
        let result = "";
        for (let j=0; j<6; j++) {
            result += feistelXored[( 6 * i ) + j];
        }
        sBoxResult += findInS(i, result);
    }
    return sBoxResult;
};

export const pPermutation = (sBoxed) => {
    let result = "";
    for (let i=0; i<pTable.length; i++) {
        const current = pTable[i];
        result += sBoxed[current - 1];
    }
    return result;
};

export const feistel = (previousR, iKey) => {
    const feistelExpanded =  feistelExpansion(previousR);
    const feistelXored = xor(feistelExpanded, iKey);
    const sBoxed = sBoxDivision(feistelXored);
    const pPermuted = pPermutation(sBoxed);
    return pPermuted;
};

export const encryptionRounds = (L0, R0, permutedKeys) => {
    const LArray = [];
    const RArray = [];
    LArray.push(L0);
    RArray.push(R0);
    for (let round=0; round<16; round++) {
        const current = {};
        current.Li = RArray[round];
        const feistelEncrypted = feistel(RArray[round], permutedKeys[round]);
        current.Ri = xor(LArray[round], feistelEncrypted);
        LArray.push(current.Li);
        RArray.push(current.Ri);
    }
    return { LArray, RArray };
};

export const desEncryption = (plaintext, permutedKeys) => {
    if (plaintext.length != 16) throw new Error("ERR_PLAINTEXT_LENGTH_NOT_16");
    const binaryPlaintext = hexToBin(plaintext);
    const IPedPlaintext = IP(binaryPlaintext);
    const { L0, R0 } = splitInL0AndR0(IPedPlaintext);
    const { LArray, RArray } = encryptionRounds(L0, R0, permutedKeys);
    console.log({ LArray, RArray });
};