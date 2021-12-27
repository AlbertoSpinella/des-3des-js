import crypto from "crypto";
import { padTo16Bytes } from "../utils.js";

export const padPlaintextMultipleBlocks = (input) => {
    const plaintextBlocks = [];
    const plaintextBlocksPadded = [];
    for (let i=0; i < input.length; i+=16)
        plaintextBlocks.push(input.substring(i, i + 16));

    for (let plaintextBlock of plaintextBlocks) {
        if (plaintextBlock.length != 16) plaintextBlock = padTo16Bytes(plaintextBlock);
        plaintextBlocksPadded.push(plaintextBlock);
    }
    return plaintextBlocksPadded.join("");
};

export const standardDesEcb = (hexKey, hexPlaintext) => {
    hexPlaintext = padPlaintextMultipleBlocks(hexPlaintext);
    const key = Buffer.from(hexKey, "hex");
    const plaintext = Buffer.from(hexPlaintext, "hex");
    
    try {
        const cipher = crypto.createCipheriv("des-ecb", key, "");
        const ciphertext = cipher.update(plaintext, "utf-8", "hex").toUpperCase();
        return ciphertext;
    } catch (error) {
        console.log("ERR", error);
        process.exit(1);
    }
};

export const standardDesCbc = (hexKey, hexPlaintext, hexIv) => {
    hexPlaintext = padPlaintextMultipleBlocks(hexPlaintext);
    const key = Buffer.from(hexKey, "hex");
    const plaintext = Buffer.from(hexPlaintext, "hex");
    const iv = Buffer.from(hexIv, "hex");
    
    try {
        const cipher = crypto.createCipheriv("des-cbc", key, iv);
        const ciphertext = cipher.update(plaintext, "utf-8", "hex").toUpperCase();
        return ciphertext;
    } catch (error) {
        console.log("ERR", error);
        process.exit(1);
    }
};

export const standardDesCfb = (hexKey, hexPlaintext, hexIv) => {
    hexPlaintext = padPlaintextMultipleBlocks(hexPlaintext);
    const key = Buffer.from(hexKey, "hex");
    const plaintext = Buffer.from(hexPlaintext, "hex");
    const iv = Buffer.from(hexIv, "hex");
    
    try {
        const cipher = crypto.createCipheriv("des-cfb", key, iv);
        const ciphertext = cipher.update(plaintext, "utf-8", "hex").toUpperCase();
        return ciphertext;
    } catch (error) {
        console.log("ERR", error);
        process.exit(1);
    }
};

export const standardDesOfb = (hexKey, hexPlaintext, hexIv) => {
    hexPlaintext = padPlaintextMultipleBlocks(hexPlaintext);
    const key = Buffer.from(hexKey, "hex");
    const plaintext = Buffer.from(hexPlaintext, "hex");
    const iv = Buffer.from(hexIv, "hex");
    
    try {
        const cipher = crypto.createCipheriv("des-ofb", key, iv);
        const ciphertext = cipher.update(plaintext, "utf-8", "hex").toUpperCase();
        return ciphertext;
    } catch (error) {
        console.log("ERR", error);
        process.exit(1);
    }
};