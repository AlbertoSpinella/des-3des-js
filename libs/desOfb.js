import { desEcb } from "./desEcb.js";
import { hexToBin, xor, binToHex, padTo16Bytes } from "./utils.js";

export const desOfbEncryptionSingleBlock = (plaintextBlock, permutedKeys, iv) => {
    if (plaintextBlock.length != 16) throw new Error("ERR_PLAINTEXT_LENGTH_NOT_16");
    if (iv.length != 16) throw new Error("ERR_IV_LENGTH_NOT_16");
    const intermediateBlock = desEcb(iv, permutedKeys);
    const binaryIntermediateBlock = hexToBin(intermediateBlock);
    const binaryPlaintext = hexToBin(plaintextBlock);
    const binaryCiphertext = xor(binaryIntermediateBlock, binaryPlaintext);
    const ciphertext = binToHex(binaryCiphertext);
    return { ciphertextBlock: ciphertext, newIv: intermediateBlock };
};

export const desOfbEncryption = (plaintext, permutedKeys, iv, mode) => {
    const plaintextBlocks = [];
    const ciphertextBlocks = [];
    for (let i=0; i < plaintext.length; i+=16)
        plaintextBlocks.push(plaintext.substring(i, i + 16));
    for (let plaintextBlock of plaintextBlocks) {
        if (plaintextBlock.length != 16) plaintextBlock = padTo16Bytes(plaintextBlock);
        const { ciphertextBlock, newIv } = desOfbEncryptionSingleBlock(plaintextBlock, permutedKeys, iv);
        iv = newIv;
        ciphertextBlocks.push(ciphertextBlock);
    }
    const ciphertext = ciphertextBlocks.join("");
    return ciphertext;
};