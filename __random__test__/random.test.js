import { randomHexString } from "../libs/test/test.utils.js";
import { keySchedulation } from "../libs/keySchedulation.js";
import { desEncryption } from "../libs/desEncryption.js";
import { standardDes } from "../libs/test/standard-des.js";

const RANDOM_TEST_AMOUNT = 128;

for (let i=0; i<RANDOM_TEST_AMOUNT; i++) {
    const hexKey = randomHexString(16);
    const hexPlaintext = randomHexString(16);
    test(`Random key and plaintext test - ${i+1}/${RANDOM_TEST_AMOUNT}`, ()  => {
        const permutedKeys = keySchedulation(hexKey);
        const ciphertextToTest = desEncryption(hexPlaintext, permutedKeys);
        const ciphertextResult = standardDes(hexKey, hexPlaintext);
        expect(ciphertextToTest).toBe(ciphertextResult);
    });
}