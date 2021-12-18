import { hexToBin } from "../libs/utils.js";

import {
    IP,
    splitInL0AndR0
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

test('split in R0 and L0', ()  => {
    const { L0, R0 } = splitInL0AndR0(cache.IPedPlaintext);
    expect(L0).toBe(expectedValues.L0);
    expect(R0).toBe(expectedValues.R0);
});