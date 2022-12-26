import { keySchedulation } from "./libs/keySchedulation.js";
import {
    desEcbEncryptionSingleBlock
} from "./libs/desEcbUtils.js";
import { binToHex, hexToBin, padTo16Bytes, xor, print } from "./libs/utils.js";

export const tripleDesCfbEncrypt = (plaintext, key, iv) => {
    if (key.length != 48) throw new Error("ERR_KEY_LENGTH_NOT_48");
    print({ plaintext, key, iv });

    const key1 = key.substring(0, 16);
    const key2 = key.substring(16, 32);
    const key3 = key.substring(32, 48);
    const permutedKeys1 = keySchedulation(key1);
    const permutedKeys2 = keySchedulation(key2);
    const reversedKeys2 = [...permutedKeys2].reverse();
    const permutedKeys3 = keySchedulation(key3);

    const plaintextBlocks = [];
    const ciphertextBlocks = [];
    for (let i=0; i < plaintext.length; i+=16)
        plaintextBlocks.push(plaintext.substring(i, i + 16));
    for (let plaintextBlock of plaintextBlocks) {
        if (plaintextBlock.length != 16) plaintextBlock = padTo16Bytes(plaintextBlock);
        const firstRound = desEcbEncryptionSingleBlock(iv, permutedKeys1);
        const secondRound = desEcbEncryptionSingleBlock(firstRound, reversedKeys2);
        const thirdRound = desEcbEncryptionSingleBlock(secondRound, permutedKeys3);
        const thirdRoundBin = hexToBin(thirdRound);
        const plaintextBlockBin = hexToBin(plaintextBlock);
        const ciphertextBlockHex = xor(thirdRoundBin, plaintextBlockBin);
        const ciphertextBlock = binToHex(ciphertextBlockHex);
        iv = ciphertextBlock;
        ciphertextBlocks.push(ciphertextBlock);
    }
    const ciphertext = ciphertextBlocks.join("");
    return ciphertext;
};

export const tripleDesCfbDecrypt = (ciphertext, key, iv) => {
    if (key.length != 48) throw new Error("ERR_KEY_LENGTH_NOT_48");
    print({ ciphertext, key, iv });

    const key1 = key.substring(0, 16);
    const key2 = key.substring(16, 32);
    const key3 = key.substring(32, 48);
    const permutedKeys1 = keySchedulation(key1);
    const permutedKeys2 = keySchedulation(key2);
    const reversedKeys2 = [...permutedKeys2].reverse();
    const permutedKeys3 = keySchedulation(key3);

    const ciphertextBlocks = [];
    const plaintextBlocks = [];
    for (let i=0; i < ciphertext.length; i+=16)
        ciphertextBlocks.push(ciphertext.substring(i, i + 16));
    for (const ciphertextBlock of ciphertextBlocks) {
        if (ciphertextBlock.length != 16) throw new Error("ERR_INVALID_CIPHERTEXT_LENGTH");
        const firstRound = desEcbEncryptionSingleBlock(iv, permutedKeys1);
        const secondRound = desEcbEncryptionSingleBlock(firstRound, reversedKeys2);
        const thirdRound = desEcbEncryptionSingleBlock(secondRound, permutedKeys3);
        const thirdRoundBin = hexToBin(thirdRound);
        const ciphertextBlockBin = hexToBin(ciphertextBlock);
        const plaintextBlockHex = xor(thirdRoundBin, ciphertextBlockBin);
        const plaintextBlock = binToHex(plaintextBlockHex);
        plaintextBlocks.push(plaintextBlock);
        iv = ciphertextBlock;
    }
    const plaintext = plaintextBlocks.join("");
    return plaintext;
};

print("\n3 DES CFB encryption...");
const desCfbEncrypted = tripleDesCfbEncrypt("0123456789ABCDEF0A1B2C3D4E5F6A7B", "133457799BBCDFF1475433098D5C01704F82A025AA2EE8BB", "AABBCCDDAABBCCDD");
print({ ciphertext: desCfbEncrypted });

print("\nDES CFB decryption...");
const desCfbDecrypted = tripleDesCfbDecrypt(desCfbEncrypted, "133457799BBCDFF1475433098D5C01704F82A025AA2EE8BB", "AABBCCDDAABBCCDD");
print({ plaintext: desCfbDecrypted });