import { randomHexString } from "../libs/test/test.utils.js";
import { keySchedulation } from "../libs/keySchedulation.js";
import { desEcb } from "../libs/desEcbUtils.js";
import { desCbcEncryption } from "../libs/desCbcUtils.js";
import { desCfbEncryption } from "../libs/desCfbUtils.js";
import { desOfbEncryption } from "../libs/desOfbUtils.js";
import {
    standardDesEcb,
    standardDesCbc,
    standardDesCfb,
    standardDesOfb
} from "../libs/test/standard-des.js";

const RANDOM_TEST_AMOUNT = 128;

for (let i=0; i<RANDOM_TEST_AMOUNT; i++) {
    const randomNumber = Math.floor(Math.random() * 32) + 1;
    const hexKey = randomHexString(16);
    const hexPlaintext = randomHexString(randomNumber);
    test(`DES ECB - Random key and plaintext test - ${i+1}/${RANDOM_TEST_AMOUNT}`, ()  => {
        const permutedKeys = keySchedulation(hexKey);
        const ciphertextToTest = desEcb(hexPlaintext, permutedKeys);
        const ciphertextResult = standardDesEcb(hexKey, hexPlaintext);
        expect(ciphertextToTest).toBe(ciphertextResult);
    });
}

for (let i=0; i<RANDOM_TEST_AMOUNT; i++) {
    const randomNumber = Math.floor(Math.random() * 32) + 1;
    const hexKey = randomHexString(16);
    const hexPlaintext = randomHexString(randomNumber);
    const hexIv = randomHexString(16);
    test(`DES CBC - Random key and plaintext test - ${i+1}/${RANDOM_TEST_AMOUNT}`, ()  => {
        const permutedKeys = keySchedulation(hexKey);
        const ciphertextToTest = desCbcEncryption(hexPlaintext, permutedKeys, hexIv);
        const ciphertextResult = standardDesCbc(hexKey, hexPlaintext, hexIv);
        expect(ciphertextToTest).toBe(ciphertextResult);
    });
}

for (let i=0; i<RANDOM_TEST_AMOUNT; i++) {
    const hexKey = randomHexString(16);
    const hexPlaintext = randomHexString(16);
    const hexIv = randomHexString(16);
    test(`DES CFB - Random key and plaintext test - ${i+1}/${RANDOM_TEST_AMOUNT}`, ()  => {
        const permutedKeys = keySchedulation(hexKey);
        const ciphertextToTest = desCfbEncryption(hexPlaintext, permutedKeys, hexIv, "encryption");
        const ciphertextResult = standardDesCfb(hexKey, hexPlaintext, hexIv);
        expect(ciphertextToTest).toBe(ciphertextResult);
    });
}

for (let i=0; i<RANDOM_TEST_AMOUNT; i++) {
    const randomNumber = Math.floor(Math.random() * 1024) + 1;
    const hexKey = randomHexString(16);
    const hexPlaintext = randomHexString(randomNumber);
    const hexIv = randomHexString(16);
    test(`DES OFB - Random key and plaintext test - ${i+1}/${RANDOM_TEST_AMOUNT}`, ()  => {
        const permutedKeys = keySchedulation(hexKey);
        const ciphertextToTest = desOfbEncryption(hexPlaintext, permutedKeys, hexIv);
        const ciphertextResult = standardDesOfb(hexKey, hexPlaintext, hexIv);
        expect(ciphertextToTest).toBe(ciphertextResult);
    });
}