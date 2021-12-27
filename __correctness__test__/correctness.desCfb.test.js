import {
    desCfbEncryptionSingleBlock,
    desCfbEncryption,
} from "../libs/desCfb.js";

import { expectedValues } from "../libs/test/correctness.expectedValues.js";
import { testData } from "../libs/test/correctness.testData.js";

const cache = {};


test('DES CFB encryption single block', () => {
    const ciphertextBlock = desCfbEncryptionSingleBlock(testData.plaintext, expectedValues.permuted2Keys, testData.iv);
    cache.ciphertextBlock = ciphertextBlock;
    expect(ciphertextBlock).toBe(expectedValues.ciphertextBlockCfb);
});

test('ERR - DES CFB encryption single block invalid plaintext', () => {
    try {
        const ciphertextBlock = desCfbEncryptionSingleBlock(testData.plaintext.slice(0, -1), expectedValues.permuted2Keys, testData.iv);   
        expect(0).toBe(1);
    } catch (error) {
        expect(error.message).toBe(expectedValues.ERR_PLAINTEXT_LENGTH_NOT_16);
    }
});

test('ERR - DES CFB encryption single block invalid iv', () => {
    try {
        const ciphertextBlock = desCfbEncryptionSingleBlock(testData.plaintext, expectedValues.permuted2Keys, testData.iv.slice(0, -1));
        expect(0).toBe(1);
    } catch (error) {
        expect(error.message).toBe(expectedValues.ERR_IV_LENGTH_NOT_16);
    }
});

test('DES CFB complete encryption', () => {
    const ciphertext = desCfbEncryption(testData.plaintextCfb, expectedValues.permuted2Keys, testData.iv, "encryption");
    cache.ciphertext = ciphertext;
    expect(ciphertext).toBe(expectedValues.ciphertextCfb);
});

test('DES CFB complete encryption less 16', () => {
    const ciphertext = desCfbEncryption(testData.plaintextCfb.slice(0, -1), expectedValues.permuted2Keys, testData.iv, "encryption");
    expect(ciphertext).toBe(expectedValues.ciphertextCfbLess16);
});

test('DES CFB complete decryption', () => {
    const plaintext = desCfbEncryption(cache.ciphertext, expectedValues.permuted2Keys, testData.iv, "decryption");
    expect(plaintext).toBe(testData.plaintextCfb);
});

test('ERR - DES CFB complete encryption invalid mode', () => {
    try {
        const ciphertext = desCfbEncryption(testData.plaintextCfb, expectedValues.permuted2Keys, testData.iv);   
        expect(0).toBe(1);
    } catch (error) {
        expect(error.message).toBe(expectedValues.ERR_INVALID_CFB_MODE);        
    }
});