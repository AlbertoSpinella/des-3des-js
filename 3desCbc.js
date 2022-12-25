import { keySchedulation } from "./libs/keySchedulation.js";
import {
    desCbcEncryptionSingleBlock,
    desCbcDecryptionSingleBlock
} from "./libs/desCbcUtils.js";

export const tripleDesCbcEncrypt = (plaintext, key, iv) => {
    if (key.length != 48) throw new Error("ERR_KEY_LENGTH_NOT_48");
    console.log({ plaintext, key, iv });

    const key1 = key.substring(0, 16);
    const key2 = key.substring(16, 32);
    const key3 = key.substring(32, 48);
    const permutedKeys1 = keySchedulation(key1);
    const permutedKeys2 = keySchedulation(key2);
    const permutedKeys3 = keySchedulation(key3);

    const plaintextBlocks = [];
    const ciphertextBlocks = [];
    for (let i=0; i < plaintext.length; i+=16)
        plaintextBlocks.push(plaintext.substring(i, i + 16));
    for (let plaintextBlock of plaintextBlocks) {
        if (plaintextBlock.length != 16) plaintextBlock = padTo16Bytes(plaintextBlock);
        const firstRound = desCbcEncryptionSingleBlock(plaintextBlock, permutedKeys1, iv);
        const secondRound = desCbcDecryptionSingleBlock(firstRound, permutedKeys2, iv);
        const ciphertextBlock = desCbcEncryptionSingleBlock(secondRound, permutedKeys3, iv);
        iv = ciphertextBlock;
        ciphertextBlocks.push(ciphertextBlock);
    }
    const ciphertext = ciphertextBlocks.join("");
    return ciphertext;
};

export const tripleDesCbcDecrypt = (ciphertext, key, iv) => {
    if (key.length != 48) throw new Error("ERR_KEY_LENGTH_NOT_48");
    console.log({ ciphertext, key, iv });

    const key1 = key.substring(0, 16);
    const key2 = key.substring(16, 32);
    const key3 = key.substring(32, 48);
    const permutedKeys1 = keySchedulation(key1);
    const permutedKeys2 = keySchedulation(key2);
    const permutedKeys3 = keySchedulation(key3);

    const ciphertextBlocks = [];
    const plaintextBlocks = [];
    for (let i=0; i < ciphertext.length; i+=16)
        ciphertextBlocks.push(ciphertext.substring(i, i + 16));
    for (const ciphertextBlock of ciphertextBlocks) {
        if (ciphertextBlock.length != 16) throw new Error("ERR_INVALID_CIPHERTEXT_LENGTH");
        const firstRound = desCbcDecryptionSingleBlock(ciphertextBlock, permutedKeys3, iv);
        const secondRound = desCbcEncryptionSingleBlock(firstRound, permutedKeys2, iv);
        const plaintextBlock = desCbcDecryptionSingleBlock(secondRound, permutedKeys1, iv);
        plaintextBlocks.push(plaintextBlock);
        iv = ciphertextBlock;
    }
    const plaintext = plaintextBlocks.join("");
    return plaintext;
};

console.log("\n3 DES CBC encryption...");
const desCbcEncrypted = tripleDesCbcEncrypt("0123456789ABCDEF0A1B2C3D4E5F6A7B", "133457799BBCDFF1475433098D5C01704F82A025AA2EE8BB", "AABBCCDDAABBCCDD");
console.log({ ciphertext: desCbcEncrypted });

console.log("\nDES CBC decryption...");
const desCbcDecrypted = tripleDesCbcDecrypt(desCbcEncrypted, "133457799BBCDFF1475433098D5C01704F82A025AA2EE8BB", "AABBCCDDAABBCCDD");
console.log({ plaintext: desCbcDecrypted });