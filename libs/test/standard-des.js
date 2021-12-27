import crypto from "crypto";

export const standardDesEcb = (hexKey, hexPlaintext) => {
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