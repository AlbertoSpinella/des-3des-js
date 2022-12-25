import { keySchedulation } from "../libs/keySchedulation.js";
import { desEcb } from "../libs/desEcbUtils.js";

import { expectedValues } from "../libs/test/nist.expectedValues.js";
import { testData } from "../libs/test/nist.testData.js";

test("Validate test data", () => {
    expect(testData.IP_E.plaintexts.length).toBe(64);
    expect(testData.IP_E.plaintexts.length).toBe(expectedValues.IP_E.ciphertexts.length);
});

for (let i=0; i<testData.IP_E.plaintexts.length; i++) {
    test(`IP and E test - ${i+1}/${testData.IP_E.plaintexts.length}`, ()  => {
        const permutedKeys = keySchedulation(testData.IP_E.key);
        const ciphertext = desEcb(testData.IP_E.plaintexts[i], permutedKeys);
        expect(ciphertext).toBe(expectedValues.IP_E.ciphertexts[i]);
    });
}

