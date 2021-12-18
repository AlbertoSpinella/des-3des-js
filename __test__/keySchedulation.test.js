import {
    padKey,
    hexToBin
} from "../libs/utils.js";

import {
    PC1,
    shiftAfterPC1,
    PC2,
    keySchedulation
} from "../libs/keySchedulation.js";

import { expectedValues } from "../libs/test/expectedValues.js";
import { testData } from "../libs/test/testData.js";

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

test('ERR - PadKey more than 16', ()  => {
    try {
        const key = testData.key17;
        const paddedKey = padKey(key);
        expect(0).toBe(1);
    } catch (error) {
        expect(error.message).toBe(expectedValues.ERR_KEY_LENGTH_BIGGER_16);
    }
});

test('Key HexToBin', ()  => {
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
    cache.cArray = cArray;
    cache.dArray = dArray;
    expect(cArray).toStrictEqual(expectedValues.cArray);
    expect(dArray).toStrictEqual(expectedValues.dArray);
});

test('ERR - ShiftsAfterPC1 unequal half-keys lenghts', ()  => {
    try {
        const cArray0 = testData.cArray0;
        const dArray0 = testData.dArray0.slice(0, -1);
        const { cArray, dArray } = shiftAfterPC1(cArray0, dArray0);
        expect(0).toBe(1);
    } catch (error) {
        expect(error.message).toBe("ERR_UNEQUAL_HALFKEYS_LENGTHS");
    }
});

test('ERR - ShiftsAfterPC1 half-keys lenghts not 28', ()  => {
    try {
        const cArray0 = testData.cArray0.slice(0, -1);
        const dArray0 = testData.dArray0.slice(0, -1);
        const { cArray, dArray } = shiftAfterPC1(cArray0, dArray0);
        expect(0).toBe(1);
    } catch (error) {
        expect(error.message).toBe("ERR_HALFKEYS_LENGTH_NOT_28");
    }
});

test('PC2', ()  => {
    const permuted2Keys = PC2(cache.cArray, cache.dArray);
    expect(permuted2Keys).toStrictEqual(expectedValues.permuted2Keys);
});

test('ERR - PC2 unequal half-keys arrays lengths', ()  => {
    try {
    const permuted2Keys = PC2(cache.cArray, cache.dArray.pop());
    expect(0).toBe(1);
    } catch (error) {
        expect(error.message).toBe("ERR_UNEQUAL_HALFKEYS_ARRAYS_LENGTHS");
    }
});

test('ERR - PC2 half-keys arrays lengths not ', ()  => {
    try {
    const permuted2Keys = PC2(cache.cArray.pop(), cache.dArray.pop());
    expect(0).toBe(1);
    } catch (error) {
        expect(error.message).toBe("ERR_HALFKEYS_ARRAYS_LENGTHS_NOT_17");
    }
});

test("Complessive Key Schedulation", () => {
    const permutedKeys = keySchedulation(testData.key);
    expect(permutedKeys).toStrictEqual(expectedValues.permuted2Keys);
});