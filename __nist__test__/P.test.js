import { keySchedulation } from "../libs/keySchedulation.js";
import { desEncryption } from "../libs/desEncryption.js";

import { expectedValues } from "../libs/test/nist.expectedValues.js";
import { testData } from "../libs/test/nist.testData.js";

test("Validate test data", () => {
    expect(testData.P.keys.length).toBe(32);
    expect(testData.P.keys.length).toBe(expectedValues.P.ciphertexts.length);
});

for (let i=0; i<testData.P.keys.length; i++) {
    test(`P test - ${i+1}/${testData.P.keys.length}`, ()  => {
        const permutedKeys = keySchedulation(testData.P.keys[i]);
        const ciphertext = desEncryption(testData.P.plaintext, permutedKeys);
        expect(ciphertext).toBe(expectedValues.P.ciphertexts[i]);
    });
}