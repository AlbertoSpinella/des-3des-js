import {
    hexToBin,
    xor,
    intToBinPaddedMax4Byte,
    binToHex
} from "../libs/utils.js";

import {
    feistelExpansion,
    IP,
    splitInL0AndR0,
    sBoxDivision,
    pPermutation,
    feistel,
    encryptionRounds,
    switchAfterRounds,
    IPFinal,
    desEcb,
    desEcbEncryptionSingleBlock
} from "../libs/desEcbUtils.js";

import { expectedValues } from "../libs/test/correctness.expectedValues.js";
import { testData } from "../libs/test/correctness.testData.js";

const cache = {};

test('Plaintext HexToBin', ()  => {
    const plaintext = testData.plaintext;
    const binaryPlaintext = hexToBin(plaintext);
    cache.binaryPlaintext = binaryPlaintext;
    expect(binaryPlaintext).toBe(expectedValues.binaryPlaintext);
});

test('IP', ()  => {
    const IPedPlaintext = IP(cache.binaryPlaintext);
    cache.IPedPlaintext = IPedPlaintext;
    expect(IPedPlaintext).toBe(expectedValues.IPedPlaintext);
});

test('Split in R0 and L0', ()  => {
    const { L0, R0 } = splitInL0AndR0(cache.IPedPlaintext);
    cache.previousR = R0;
    cache.previousL = L0;
    expect(L0).toBe(expectedValues.L0);
    expect(R0).toBe(expectedValues.R0);
});

test('ERR - Split in R0 and L0 invalid IPedPlaintext', ()  => {
    try {
        const { L0, R0 } = splitInL0AndR0(cache.IPedPlaintext.slice(0, -1));
        expect(0).toBe(1);
    } catch (error) {
        expect(error.message).toBe(expectedValues.ERR_IPED_PLAINTEXT_LENGTH_NOT_64);
    }
});

test('Plaintext expansion', ()  => {
    const feistelExpanded =  feistelExpansion(cache.previousR);
    cache.feistelExpanded = feistelExpanded;
    expect(feistelExpanded).toBe(expectedValues.feistelExpanded);
});

test('Feistel xor', ()  => {
    const feistelXored = xor(cache.feistelExpanded, expectedValues.permuted2Keys[0]);
    cache.feistelXored = feistelXored;
    expect(feistelXored).toBe(expectedValues.feistelXored);
});

test('ERR - Feistel xor different lenghts', ()  => {
    try {
        const feistelXored = xor(cache.feistelExpanded.slice(0, -1), expectedValues.permuted2Keys[0]);
        expect(0).toBe(1);
    } catch (error) {
        expect(error.message).toBe(expectedValues.ERR_XOR_UNEQUAL_LENGTHS);        
    }
});

test('Feistel sBoxDivision', ()  => {
    const sBoxed = sBoxDivision(cache.feistelXored);
    cache.sBoxed = sBoxed;
    expect(sBoxed).toBe(expectedValues.sBoxed);
});

test('ERR - intToBinPaddedMax4Byte invalid numericSResult', ()  => {
    try {
        const binarySResult = intToBinPaddedMax4Byte(16);
        expect(0).toBe(1);
    } catch (error) {
        expect(error.message).toBe(expectedValues.ERR_BIN_TO_INT_PADDED_MORE_4);
    }

});

test('Feistel pPermutation', ()  => {
    const pPermuted = pPermutation(cache.sBoxed);
    expect(pPermuted).toBe(expectedValues.pPermuted);
});

test('Complessive Feistel', ()  => {
    const feistelEncrypted = feistel(cache.previousR, expectedValues.permuted2Keys[0]);
    expect(feistelEncrypted).toBe(expectedValues.pPermuted);
});

test('Encryption rounds', ()  => {
    const { LArray, RArray } = encryptionRounds(cache.previousL, cache.previousR, expectedValues.permuted2Keys);
    expect(LArray).toStrictEqual(expectedValues.LArray);
    expect(RArray).toStrictEqual(expectedValues.RArray);
});

test('Switch after rounds', ()  => {
    const L16 = expectedValues.LArray[expectedValues.LArray.length - 1];
    const R16 = expectedValues.RArray[expectedValues.RArray.length - 1];
    const switched = switchAfterRounds(L16, R16);
    cache.switched = switched;
    expect(switched).toBe(expectedValues.switched);
});

test('IPFinal', ()  => {
    const binaryCiphertext = IPFinal(cache.switched);
    expect(binaryCiphertext).toBe(expectedValues.binaryCiphertext);
});

test('Complessive DES encryption', ()  => {
    const ciphertext = desEcb(testData.plaintext, expectedValues.permuted2Keys);
    expect(ciphertext).toBe(expectedValues.ciphertext);
});

test('ERR - Complessive DES encryption with plaintext not 16', ()  => {
    try {
        const ciphertext = desEcbEncryptionSingleBlock(testData.plaintext.slice(0, -1), expectedValues.permuted2Keys);
        expect(0).toBe(1);
    } catch (error) {
        expect(error.message).toBe(expectedValues.ERR_PLAINTEXT_LENGTH_NOT_16);
    }
});

test('ERR - binToHex with invalid binary format', ()  => {
    try {
        const ciphertext = binToHex(expectedValues.binaryCiphertext.slice(0,1));
        expect(0).toBe(1);
    } catch (error) {
        expect(error.message).toBe(expectedValues.ERR_BIN_TO_HEX_INVALID_BINARY_FORMAT);
    }
});