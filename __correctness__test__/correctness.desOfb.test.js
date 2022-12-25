import {
    desOfbEncryptionSingleBlock,
    desOfbEncryption,
} from "../libs/desOfbUtils.js";

import { expectedValues } from "../libs/test/correctness.expectedValues.js";
import { testData } from "../libs/test/correctness.testData.js";

const cache = {};


test('DES OFB encryption single block', () => {
    const { ciphertextBlock, newIv } = desOfbEncryptionSingleBlock(testData.plaintext, expectedValues.permuted2Keys, testData.iv);
    cache.ciphertextBlock = ciphertextBlock;
    cache.newIv = newIv;
    expect(ciphertextBlock).toBe(expectedValues.ciphertextBlockOfb.ciphertextBlock);
    expect(newIv).toBe(expectedValues.ciphertextBlockOfb.newIv);
});

test('ERR - DES OFB encryption single block invalid plaintext', () => {
    try {
        const { ciphertextBlock, newIv } = desOfbEncryptionSingleBlock(testData.plaintext.slice(0, -1), expectedValues.permuted2Keys, testData.iv);   
        expect(0).toBe(1);
    } catch (error) {
        expect(error.message).toBe(expectedValues.ERR_PLAINTEXT_LENGTH_NOT_16);
    }
});

test('ERR - DES OFB encryption single block invalid iv', () => {
    try {
        const ciphertextBlock = desOfbEncryptionSingleBlock(testData.plaintext, expectedValues.permuted2Keys, testData.iv.slice(0, -1));
        expect(0).toBe(1);
    } catch (error) {
        expect(error.message).toBe(expectedValues.ERR_IV_LENGTH_NOT_16);
    }
});

test('DES OFB complete encryption', () => {
    const ciphertext = desOfbEncryption(testData.plaintextOfb, expectedValues.permuted2Keys, testData.iv);
    cache.ciphertext = ciphertext;
    expect(ciphertext).toBe(expectedValues.ciphertextOfb);
});

test('DES OFB complete encryption less 16', () => {
    const ciphertext = desOfbEncryption(testData.plaintextOfb.slice(0, -1), expectedValues.permuted2Keys, testData.iv);
    expect(ciphertext).toBe(expectedValues.ciphertextOfbLess16);
});

test('DES OFB complete decryption', () => {
    const plaintext = desOfbEncryption(cache.ciphertext, expectedValues.permuted2Keys, testData.iv);
    expect(plaintext).toBe(testData.plaintextOfb);
});