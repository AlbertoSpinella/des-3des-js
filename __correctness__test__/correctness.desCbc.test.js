import {
    padTo16Bytes
} from "../libs/utils.js";

import {
    desCbcEncryptionSingleBlock,
    desCbcEncryption,
    desCbcDecryptionSingleBlock,
    desCbcDecryption
} from "../libs/desCbcUtils.js";

import { expectedValues } from "../libs/test/correctness.expectedValues.js";
import { testData } from "../libs/test/correctness.testData.js";

const cache = {};

test('padTo16Bytes already 16', () => {
    const plaintextBlock = padTo16Bytes(testData.plaintext);
    expect(plaintextBlock).toBe(expectedValues.paddedPlaintextBlock);
});

test('padTo16Bytes less 16', () => {
    const plaintextBlock = padTo16Bytes(testData.plaintext15);
    expect(plaintextBlock).toBe(expectedValues.paddedPlaintextBlock15);
});

test('padTo16Bytes more 16', () => {
    try {
        const plaintextBlock = padTo16Bytes(testData.plaintext17);
        expect(0).toBe(1);   
    } catch (error) {
        expect(error.message).toBe(expectedValues.ERR_INPUT_LENGTH_BIGGER_16);
    }
});

test('DES CBC encryption single block', () => {
    const ciphertextBlock = desCbcEncryptionSingleBlock(testData.plaintext, expectedValues.permuted2Keys, testData.iv);
    cache.ciphertextBlock = ciphertextBlock;
    expect(ciphertextBlock).toBe(expectedValues.ciphertextBlockCbc);
});

test('ERR - DES CBC encryption single block invalid plaintext', () => {
    try {
        const ciphertextBlock = desCbcEncryptionSingleBlock(testData.plaintext.slice(0, -1), expectedValues.permuted2Keys, testData.iv);   
        expect(0).toBe(1);
    } catch (error) {
        expect(error.message).toBe(expectedValues.ERR_PLAINTEXT_LENGTH_NOT_16);
    }
});

test('ERR - DES CBC encryption single block invalid iv', () => {
    try {
        const ciphertextBlock = desCbcEncryptionSingleBlock(testData.plaintext, expectedValues.permuted2Keys, testData.iv.slice(0, -1));
        expect(0).toBe(1);
    } catch (error) {
        expect(error.message).toBe(expectedValues.ERR_IV_LENGTH_NOT_16);
    }
});

test('DES CBC complete encryption', () => {
    const ciphertext = desCbcEncryption(testData.plaintextCbc, expectedValues.permuted2Keys, testData.iv);
    cache.ciphertext = ciphertext;
    expect(ciphertext).toBe(expectedValues.ciphertextCbc);
});

test('DES CBC complete encryption less 16', () => {
    const ciphertext = desCbcEncryption(testData.plaintextCbc.slice(0, -1), expectedValues.permuted2Keys, testData.iv);
    expect(ciphertext).toBe(expectedValues.ciphertextCbcLess16);
});

test('DES CBC decryption single block', () => {
    const plaintextBlock = desCbcDecryptionSingleBlock(cache.ciphertextBlock, expectedValues.permuted2Keys, testData.iv);
    expect(plaintextBlock).toBe(testData.plaintext);
});

test('ERR - DES CBC decryption single block invalid ciphertext', () => {
    try {
        const plaintextBlock = desCbcDecryptionSingleBlock(cache.ciphertextBlock.slice(0, -1), expectedValues.permuted2Keys, testData.iv);   
        expect(0).toBe(1);
    } catch (error) {
        expect(error.message).toBe(expectedValues.ERR_CIPHERTEXT_LENGTH_NOT_16);
    }
});

test('ERR - DES CBC decryption single block invalid iv', () => {
    try {
        const plaintextBlock = desCbcDecryptionSingleBlock(cache.ciphertextBlock, expectedValues.permuted2Keys, testData.iv.slice(0, -1));
        expect(0).toBe(1);
    } catch (error) {
        expect(error.message).toBe(expectedValues.ERR_IV_LENGTH_NOT_16);        
    }
});

test('DES CBC complete decryption', () => {
    const plaintext = desCbcDecryption(cache.ciphertext, expectedValues.permuted2Keys, testData.iv);
    expect(plaintext).toBe(testData.plaintextCbc);
});

test('DES CBC complete decryption invalid ciphertext', () => {
    try {
        const plaintext = desCbcDecryption(cache.ciphertext.slice(0, -1), expectedValues.permuted2Keys, testData.iv);   
        expect(0).toBe(1);
    } catch (error) {
        expect(error.message).toBe(expectedValues.ERR_INVALID_CIPHERTEXT_LENGTH);
    }
});