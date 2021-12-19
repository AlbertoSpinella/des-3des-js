import { keySchedulation } from "../libs/keySchedulation.js";
import { desEncryption } from "../libs/desEncryption.js";

import { expectedValues } from "../libs/test/nist.expectedValues.js";
import { testData } from "../libs/test/nist.testData.js";

test("Validate test data", () => {
    expect(testData.plaintexts.length).toBe(64);
    expect(testData.plaintexts.length).toBe(expectedValues.ciphertexts.length);
});

for (let i=0; i<testData.plaintexts.length; i++) {
    test(`IP and E test - ${i+1}/64`, ()  => {
        const permutedKeys = keySchedulation(testData.key);
        const ciphertext = desEncryption(testData.plaintexts[i], permutedKeys);
        expect(ciphertext).toBe(expectedValues.ciphertexts[i]);
    });
}

