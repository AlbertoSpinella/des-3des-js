import {
    padKey,
    hexToBin,
    PC1,
    shiftAfterPC1
} from "../libs/utils.js";
import { expectedValues } from "../libs/test/expectedValues.js";
import { testData } from "../libs/test/testData.js";
// import { keySchedulation } from "../main.js";

const cache = {};

test('PadKey already 16', ()  => {
    const key = testData.key;
    const paddedKey = padKey(key);
    cache.paddedKey = paddedKey;
    expect(paddedKey).toBe(expectedValues.paddedKey);
});

test('PadKey less than 16', ()  => {
    const key = testData.key15;
    const paddedKey = padKey(key);
    expect(paddedKey).toBe(expectedValues.paddedKeyLess16);
});

test('PadKey more than 16', ()  => {
    try {
        const key = testData.key17;
        const paddedKey = padKey(key);
    } catch (error) {
        expect(error.message).toBe(expectedValues.ERR_KEY_LENGTH_BIGGER_16);
    }
});

test('HexToBin', ()  => {
    const binaryKey = hexToBin(cache.paddedKey);
    cache.binaryKey = binaryKey;
    expect(binaryKey).toBe(expectedValues.binaryKey);
});

test('PC1', ()  => {
    const permuted1Key = PC1(cache.binaryKey);
    cache.permuted1Key = permuted1Key;
    expect(permuted1Key).toBe(expectedValues.permuted1Key);
});

test('ShiftsAfterPC1', ()  => {
    const cArray0 = testData.cArray0;
    const dArray0 = testData.dArray0;
    const { cArray, dArray } = shiftAfterPC1(cArray0, dArray0);
    expect(cArray).toStrictEqual(expectedValues.cArray);
    expect(dArray).toStrictEqual(expectedValues.dArray);
});