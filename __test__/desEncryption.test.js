import {
    hexToBin,
    xor
} from "../libs/utils.js";

import {
    feistelExpansion,
    IP,
    splitInL0AndR0,
} from "../libs/desEncryption.js";

import { expectedValues } from "../libs/test/expectedValues.js";
import { testData } from "../libs/test/testData.js";

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
    expect(L0).toBe(expectedValues.L0);
    expect(R0).toBe(expectedValues.R0);
});

test('ERR - Split in R0 and L0', ()  => {
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
    expect(feistelXored).toBe(expectedValues.feistelXored);
});