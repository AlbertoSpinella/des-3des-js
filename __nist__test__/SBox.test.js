import { keySchedulation } from "../libs/keySchedulation.js";
import { desEncryption } from "../libs/desEncryption.js";

import { expectedValues } from "../libs/test/nist.expectedValues.js";
import { testData } from "../libs/test/nist.testData.js";

test("Validate test data", () => {
    expect(testData.SBox.keys.length).toBe(19);
    expect(testData.SBox.keys.length).toBe(testData.SBox.plaintexts.length);
    expect(testData.SBox.keys.length).toBe(expectedValues.SBox.ciphertexts.length);
});

for (let i=0; i<testData.SBox.keys.length; i++) {
    test(`SBox test - ${i+1}/${testData.SBox.keys.length}`, ()  => {
        const permutedKeys = keySchedulation(testData.SBox.keys[i]);
        const ciphertext = desEncryption(testData.SBox.plaintexts[i], permutedKeys);
        expect(ciphertext).toBe(expectedValues.SBox.ciphertexts[i]);
    });
}