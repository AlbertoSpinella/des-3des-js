import { desEcb } from "./desEcbUtils.js";
import { binToHex, hexToBin, xor, padTo16Bytes } from "./utils.js";

export const desCbcEncryptionSingleBlock = (plaintextBlock, permutedKeys, iv) => {
    if (plaintextBlock.length != 16) throw new Error("ERR_PLAINTEXT_LENGTH_NOT_16");
    if (iv.length != 16) throw new Error("ERR_IV_LENGTH_NOT_16");
    const binaryPlaintext = hexToBin(plaintextBlock);
    const binaryIv = hexToBin(iv);
    const binaryPlaintextXorIv = xor(binaryPlaintext, binaryIv);
    const plaintextXorIv = binToHex(binaryPlaintextXorIv);
    const ciphertext = desEcb(plaintextXorIv, permutedKeys);
    return ciphertext;
};

export const desCbcDecryptionSingleBlock = (ciphertextBlock, permutedKeys, iv) => {
    if (ciphertextBlock.length != 16) throw new Error("ERR_CIPHERTEXT_LENGTH_NOT_16");
    if (iv.length != 16) throw new Error("ERR_IV_LENGTH_NOT_16");
    const intermediateBlock = desEcb(ciphertextBlock, permutedKeys);
    const binaryIntermediateBlock = hexToBin(intermediateBlock);
    const binaryIv = hexToBin(iv);
    const binaryPlaintext = xor(binaryIntermediateBlock, binaryIv);
    const plaintext = binToHex(binaryPlaintext);

    return plaintext;
};

export const desCbcEncryption = (plaintext, permutedKeys, iv) => {
    const plaintextBlocks = [];
    const ciphertextBlocks = [];
    for (let i=0; i < plaintext.length; i+=16)
        plaintextBlocks.push(plaintext.substring(i, i + 16));
    for (let plaintextBlock of plaintextBlocks) {
        if (plaintextBlock.length != 16) plaintextBlock = padTo16Bytes(plaintextBlock);
        const ciphertextBlock = desCbcEncryptionSingleBlock(plaintextBlock, permutedKeys, iv);
        iv = ciphertextBlock;
        ciphertextBlocks.push(ciphertextBlock);
    }
    const ciphertext = ciphertextBlocks.join("");
    return ciphertext;
};

export const desCbcDecryption = (ciphertext, permutedKeys, iv) => {
    const reversedKeys = [...permutedKeys].reverse();
    
    const ciphertextBlocks = [];
    const plaintextBlocks = [];
    for (let i=0; i < ciphertext.length; i+=16)
        ciphertextBlocks.push(ciphertext.substring(i, i + 16));
    for (const ciphertextBlock of ciphertextBlocks) {
        if (ciphertextBlock.length != 16) throw new Error("ERR_INVALID_CIPHERTEXT_LENGTH");
        const plaintextBlock = desCbcDecryptionSingleBlock(ciphertextBlock, reversedKeys, iv);
        plaintextBlocks.push(plaintextBlock);
        iv = ciphertextBlock;
    }
    const plaintext = plaintextBlocks.join("");
    return plaintext;
};