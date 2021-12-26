import { keySchedulation } from "../libs/keySchedulation.js";
import { desEcb } from "../libs/desEcb.js";

import { expectedValues } from "../libs/test/nist.expectedValues.js";
import { testData } from "../libs/test/nist.testData.js";

test("Validate test data", () => {
    expect(testData.PC1_PC2.keys.length).toBe(56);
    expect(testData.PC1_PC2.keys.length).toBe(expectedValues.PC1_PC2.ciphertexts.length);
});

for (let i=0; i<testData.PC1_PC2.keys.length; i++) {
    test(`PC1 and PC2 test - ${i+1}/${testData.PC1_PC2.keys.length}`, ()  => {
        const permutedKeys = keySchedulation(testData.PC1_PC2.keys[i]);
        const ciphertext = desEcb(testData.PC1_PC2.plaintext, permutedKeys);
        expect(ciphertext).toBe(expectedValues.PC1_PC2.ciphertexts[i]);
    });
}

